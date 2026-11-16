import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Video,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  PRACTICE_AREAS,
  TIME_SLOTS,
  buildWhatsAppUrl,
} from '../data/officeData';
import { HairlineReveal, Reveal } from './Reveal';

interface BookingAndContactProps {
  selectedArea: string;
}

interface QuickDateOption {
  iso: string;
  label: string;
  weekday: string;
}

interface BookingErrors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
}

interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

function getUpcomingWeekdays(count: number): QuickDateOption[] {
  const results: QuickDateOption[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (results.length < count) {
    const dayOfWeek = cursor.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const year = cursor.getFullYear();
      const month = String(cursor.getMonth() + 1).padStart(2, '0');
      const day = String(cursor.getDate()).padStart(2, '0');
      const iso = `${year}-${month}-${day}`;
      const weekday = cursor.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      results.push({
        iso,
        label: `${day}/${month}`,
        weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return results;
}

function formatDatePtBr(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function formatBrazilPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function isWeekendIso(iso: string): boolean {
  if (!iso) return false;
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return false;
  const date = new Date(y, m - 1, d, 12, 0, 0);
  const day = date.getDay();
  return day === 0 || day === 6;
}

const NAME_REGEX = /^[\p{L}\s.'-]+$/u;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function BookingAndContact({ selectedArea }: BookingAndContactProps) {
  const quickDates = useMemo(() => getUpcomingWeekdays(5), []);
  const todayIso = quickDates[0]?.iso ?? '';

  // Agendamento Online state
  const [modality, setModality] = useState<
    'Presencial (St. Bueno, Goiânia)' | 'Online (Videoconferência)'
  >('Presencial (St. Bueno, Goiânia)');
  const [area, setArea] = useState<string>(PRACTICE_AREAS[0].title);
  const [bookingDate, setBookingDate] = useState<string>(todayIso);
  const [bookingTime, setBookingTime] = useState<string>(TIME_SLOTS[0]);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingTouched, setBookingTouched] = useState<Record<string, boolean>>({});
  const [bookingErrors, setBookingErrors] = useState<BookingErrors>({});
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Formulário de Contato state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactTouched, setContactTouched] = useState<Record<string, boolean>>({});
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [contactChannel, setContactChannel] = useState<'whatsapp' | 'email' | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    if (selectedArea) {
      setArea(selectedArea);
      setBookingSubmitted(false);
    }
  }, [selectedArea]);

  const validateBookingField = (
    field: keyof BookingErrors,
    values: { name: string; phone: string; date: string; time: string }
  ): string | undefined => {
    if (field === 'name') {
      const trimmed = values.name.trim();
      if (!trimmed) return 'Informe seu nome completo.';
      if (trimmed.length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
      if (!NAME_REGEX.test(trimmed)) return 'Use apenas letras e espaços no nome.';
    }
    if (field === 'phone') {
      const digits = values.phone.replace(/\D/g, '');
      if (!digits) return 'Informe seu número de telefone ou WhatsApp.';
      if (digits.length < 10 || digits.length > 11) {
        return 'Informe um número válido com DDD (10 ou 11 dígitos).';
      }
    }
    if (field === 'date') {
      if (!values.date) return 'Selecione uma data para a consulta.';
      if (todayIso && values.date < todayIso) {
        return 'Selecione uma data igual ou posterior a hoje.';
      }
      if (isWeekendIso(values.date)) {
        return 'Atendimentos ocorrem de segunda a sexta-feira. Selecione um dia útil.';
      }
    }
    if (field === 'time') {
      if (!values.time) return 'Escolha um horário disponível.';
    }
    return undefined;
  };

  const validateAllBooking = (): BookingErrors => {
    const values = {
      name: bookingName,
      phone: bookingPhone,
      date: bookingDate,
      time: bookingTime,
    };
    const errors: BookingErrors = {};
    const nameErr = validateBookingField('name', values);
    const phoneErr = validateBookingField('phone', values);
    const dateErr = validateBookingField('date', values);
    const timeErr = validateBookingField('time', values);
    if (nameErr) errors.name = nameErr;
    if (phoneErr) errors.phone = phoneErr;
    if (dateErr) errors.date = dateErr;
    if (timeErr) errors.time = timeErr;
    return errors;
  };

  const handleBookingBlur = (field: keyof BookingErrors) => {
    setBookingTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateBookingField(field, {
      name: bookingName,
      phone: bookingPhone,
      date: bookingDate,
      time: bookingTime,
    });
    setBookingErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingTouched({ name: true, phone: true, date: true, time: true });
    const errors = validateAllBooking();
    setBookingErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setBookingSubmitted(true);
  };

  const validateContactField = (
    field: keyof ContactErrors,
    values: { name: string; email: string; message: string }
  ): string | undefined => {
    if (field === 'name') {
      const trimmed = values.name.trim();
      if (!trimmed) return 'Informe seu nome.';
      if (trimmed.length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
      if (!NAME_REGEX.test(trimmed)) return 'Use apenas letras e espaços no nome.';
    }
    if (field === 'email') {
      const trimmed = values.email.trim();
      if (!trimmed) return 'Informe seu endereço de e-mail.';
      if (!EMAIL_REGEX.test(trimmed)) return 'Informe um e-mail válido (ex.: nome@dominio.com).';
    }
    if (field === 'message') {
      const trimmed = values.message.trim();
      if (!trimmed) return 'Escreva sua mensagem ou dúvida jurídica.';
      if (trimmed.length < 15) {
        return 'Descreva brevemente seu caso com pelo menos 15 caracteres.';
      }
      if (trimmed.length > 1000) {
        return 'A mensagem deve ter no máximo 1000 caracteres.';
      }
    }
    return undefined;
  };

  const validateAllContact = (): ContactErrors => {
    const values = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    };
    const errors: ContactErrors = {};
    const nameErr = validateContactField('name', values);
    const emailErr = validateContactField('email', values);
    const msgErr = validateContactField('message', values);
    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    if (msgErr) errors.message = msgErr;
    return errors;
  };

  const handleContactBlur = (field: keyof ContactErrors) => {
    setContactTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateContactField(field, {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    });
    setContactErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleContactSubmit = (channel: 'whatsapp' | 'email') => {
    setContactTouched({ name: true, email: true, message: true });
    const errors = validateAllContact();
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setContactChannel(channel);
    setCopiedMessage(false);
  };

  const bookingWaText = [
    `Olá, Dr. Hugo Malafaia! Gostaria de confirmar um agendamento de consulta:`,
    `• Nome: ${bookingName.trim()}`,
    `• Telefone: ${bookingPhone.trim()}`,
    `• Área: ${area}`,
    `• Modalidade: ${modality}`,
    `• Data: ${formatDatePtBr(bookingDate)}`,
    `• Horário: ${bookingTime}`,
  ].join('\n');

  const bookingWaHref = buildWhatsAppUrl(bookingWaText);

  const contactSummaryText = [
    `Contato pelo site — ${BUSINESS_INFO.name}`,
    `Nome: ${contactName.trim()}`,
    `E-mail: ${contactEmail.trim()}`,
    `Mensagem: ${contactMessage.trim()}`,
  ].join('\n');

  const contactWaHref = buildWhatsAppUrl(contactSummaryText);
  const contactMailtoHref = `mailto:?subject=${encodeURIComponent(
    `Consulta Jurídica — ${contactName.trim()}`
  )}&body=${encodeURIComponent(contactSummaryText)}`;

  const handleCopyContactMessage = async () => {
    try {
      await navigator.clipboard.writeText(contactSummaryText);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      setCopiedMessage(false);
    }
  };

  const inputBaseClass =
    'w-full min-h-[44px] rounded-lg border bg-[#F7F7F5] dark:bg-[#1A1A1A] px-3.5 py-2.5 text-sm text-[#1A1A1A] dark:text-[#F5F5F3] placeholder:text-neutral-500 focus:outline-none transition-colors';

  return (
    <section
      id="agendamento"
      className="scroll-mt-14 md:scroll-mt-18 bg-[#F7F7F5] text-[#1A1A1A] dark:bg-[#1A1A1A] dark:text-[#F5F5F3] py-16 lg:py-24 border-b border-[#E2E2DE] dark:border-white/10 transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl space-y-3 mb-8">
          <p className="text-xs font-semibold tracking-wide text-[#15803D] dark:text-[#2ECC71]">
            Atendimento &amp; Contato
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#F5F5F3]">
            Agende sua consulta ou envie sua mensagem
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Escolha data, horário e modalidade de atendimento presencial em Goiânia ou online, ou
            encaminhe sua dúvida diretamente via WhatsApp ou e-mail.
          </p>
        </Reveal>

        <HairlineReveal className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Agendamento Online */}
          <Reveal
            delay={0.06}
            className="lg:col-span-7 rounded-xl border border-[#E2E2DE] dark:border-white/10 bg-white dark:bg-[#222222] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#E2E2DE] dark:border-white/10 pb-5 mb-6">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#1A1A1A] dark:text-[#F5F5F3]">
                  Agendamento Online
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  Selecione o melhor dia e horário para sua reunião jurídica
                </p>
              </div>
              <Calendar
                className="h-5 w-5 text-[#15803D] dark:text-[#2ECC71] shrink-0"
                aria-hidden="true"
              />
            </div>

            {bookingSubmitted ? (
              <div className="space-y-6">
                <div className="rounded-lg border border-[#2ECC71]/60 dark:border-[#2ECC71]/40 bg-[#F7F7F5] dark:bg-[#1A1A1A] p-5 space-y-4">
                  <div className="flex items-center gap-2.5 text-[#15803D] dark:text-[#2ECC71]">
                    <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="text-sm font-semibold">
                      Pré-agendamento validado e pronto para envio
                    </span>
                  </div>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-t border-[#E2E2DE] dark:border-white/10 pt-4">
                    <div>
                      <dt className="text-xs text-neutral-500 dark:text-neutral-400">Cliente</dt>
                      <dd className="font-medium text-[#1A1A1A] dark:text-[#F5F5F3]">
                        {bookingName.trim()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-neutral-500 dark:text-neutral-400">
                        Telefone / WhatsApp
                      </dt>
                      <dd className="font-medium text-[#1A1A1A] dark:text-[#F5F5F3] tabular-nums">
                        {bookingPhone}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-neutral-500 dark:text-neutral-400">
                        Data e Horário
                      </dt>
                      <dd className="font-medium text-[#15803D] dark:text-[#2ECC71] tabular-nums">
                        {formatDatePtBr(bookingDate)} às {bookingTime}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-neutral-500 dark:text-neutral-400">Modalidade</dt>
                      <dd className="font-medium text-[#1A1A1A] dark:text-[#F5F5F3]">{modality}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs text-neutral-500 dark:text-neutral-400">
                        Área de Interesse
                      </dt>
                      <dd className="font-medium text-[#1A1A1A] dark:text-[#F5F5F3]">{area}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={bookingWaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#2ECC71] px-6 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#27AE60] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Enviar confirmação no WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setBookingSubmitted(false)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-black/15 dark:border-white/15 px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-black/40 dark:hover:border-white/40 transition-colors cursor-pointer"
                  >
                    Alterar dados
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} noValidate className="space-y-6">
                {/* Modalidade */}
                <fieldset className="space-y-2.5">
                  <legend className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Modalidade da consulta
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setModality('Presencial (St. Bueno, Goiânia)')}
                      className={`flex min-h-[44px] items-center gap-2.5 rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                        modality === 'Presencial (St. Bueno, Goiânia)'
                          ? 'border-[#15803D] dark:border-[#2ECC71] bg-[#2ECC71]/15 text-[#1A1A1A] dark:text-[#F5F5F3]'
                          : 'border-[#E2E2DE] dark:border-white/10 bg-[#F7F7F5] dark:bg-[#1A1A1A] text-neutral-700 dark:text-neutral-300 hover:border-black/30 dark:hover:border-white/25'
                      }`}
                    >
                      <MapPin
                        className={`h-4 w-4 shrink-0 ${
                          modality === 'Presencial (St. Bueno, Goiânia)'
                            ? 'text-[#15803D] dark:text-[#2ECC71]'
                            : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                        aria-hidden="true"
                      />
                      <span>Presencial · St. Bueno</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setModality('Online (Videoconferência)')}
                      className={`flex min-h-[44px] items-center gap-2.5 rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                        modality === 'Online (Videoconferência)'
                          ? 'border-[#15803D] dark:border-[#2ECC71] bg-[#2ECC71]/15 text-[#1A1A1A] dark:text-[#F5F5F3]'
                          : 'border-[#E2E2DE] dark:border-white/10 bg-[#F7F7F5] dark:bg-[#1A1A1A] text-neutral-700 dark:text-neutral-300 hover:border-black/30 dark:hover:border-white/25'
                      }`}
                    >
                      <Video
                        className={`h-4 w-4 shrink-0 ${
                          modality === 'Online (Videoconferência)'
                            ? 'text-[#15803D] dark:text-[#2ECC71]'
                            : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                        aria-hidden="true"
                      />
                      <span>Online · Videoconferência</span>
                    </button>
                  </div>
                </fieldset>

                {/* Área */}
                <div className="space-y-2">
                  <label
                    htmlFor="booking-area"
                    className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    Área jurídica
                  </label>
                  <select
                    id="booking-area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className={`${inputBaseClass} border-[#D4D4CE] dark:border-white/15 focus:border-[#2ECC71]`}
                  >
                    {PRACTICE_AREAS.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                    <option value="Outro assunto jurídico">Outro assunto jurídico</option>
                  </select>
                </div>

                {/* Data */}
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label
                      htmlFor="booking-date"
                      className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      Escolha a data
                    </label>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Segunda a Sexta
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {quickDates.map((d) => {
                      const active = bookingDate === d.iso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => {
                            setBookingDate(d.iso);
                            setBookingErrors((prev) => ({ ...prev, date: undefined }));
                          }}
                          className={`flex flex-col items-center justify-center rounded-lg border py-2 px-2 text-xs transition-colors cursor-pointer ${
                            active
                              ? 'border-[#2ECC71] bg-[#2ECC71] text-[#1A1A1A] font-semibold'
                              : 'border-[#E2E2DE] dark:border-white/10 bg-[#F7F7F5] dark:bg-[#1A1A1A] text-neutral-700 dark:text-neutral-300 hover:border-black/30 dark:hover:border-white/30'
                          }`}
                        >
                          <span>{d.weekday}</span>
                          <span className="tabular-nums mt-0.5">{d.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <input
                    id="booking-date"
                    type="date"
                    min={todayIso}
                    value={bookingDate}
                    aria-invalid={Boolean(bookingErrors.date)}
                    aria-describedby={bookingErrors.date ? 'booking-date-error' : undefined}
                    onChange={(e) => {
                      const nextDate = e.target.value;
                      setBookingDate(nextDate);
                      setBookingTouched((prev) => ({ ...prev, date: true }));
                      const err = validateBookingField('date', {
                        name: bookingName,
                        phone: bookingPhone,
                        date: nextDate,
                        time: bookingTime,
                      });
                      setBookingErrors((prev) => ({ ...prev, date: err }));
                    }}
                    className={`${inputBaseClass} tabular-nums [color-scheme:light] dark:[color-scheme:dark] ${
                      bookingErrors.date
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#D4D4CE] dark:border-white/15 focus:border-[#2ECC71]'
                    }`}
                  />
                  {bookingErrors.date && (
                    <p
                      id="booking-date-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{bookingErrors.date}</span>
                    </p>
                  )}
                </div>

                {/* Horário */}
                <fieldset className="space-y-2.5">
                  <legend className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                    <Clock
                      className="h-3.5 w-3.5 text-[#15803D] dark:text-[#2ECC71]"
                      aria-hidden="true"
                    />
                    Horário disponível
                  </legend>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const active = bookingTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setBookingTime(slot);
                            setBookingErrors((prev) => ({ ...prev, time: undefined }));
                          }}
                          className={`min-h-[42px] rounded-lg border px-3 py-2 text-sm tabular-nums font-medium transition-colors cursor-pointer ${
                            active
                              ? 'border-[#2ECC71] bg-[#2ECC71] text-[#1A1A1A] font-semibold'
                              : 'border-[#E2E2DE] dark:border-white/10 bg-[#F7F7F5] dark:bg-[#1A1A1A] text-neutral-700 dark:text-neutral-300 hover:border-black/30 dark:hover:border-white/30'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Nome e Telefone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-name"
                      className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      Seu nome completo *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={bookingName}
                      aria-invalid={Boolean(bookingErrors.name)}
                      aria-describedby={bookingErrors.name ? 'booking-name-error' : undefined}
                      onBlur={() => handleBookingBlur('name')}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBookingName(val);
                        if (bookingTouched.name) {
                          const err = validateBookingField('name', {
                            name: val,
                            phone: bookingPhone,
                            date: bookingDate,
                            time: bookingTime,
                          });
                          setBookingErrors((prev) => ({ ...prev, name: err }));
                        }
                      }}
                      placeholder="Ex.: João da Silva"
                      className={`${inputBaseClass} ${
                        bookingErrors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#D4D4CE] dark:border-white/15 focus:border-[#2ECC71]'
                      }`}
                    />
                    {bookingErrors.name && (
                      <p
                        id="booking-name-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{bookingErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      Seu telefone / WhatsApp *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      value={bookingPhone}
                      aria-invalid={Boolean(bookingErrors.phone)}
                      aria-describedby={bookingErrors.phone ? 'booking-phone-error' : undefined}
                      onBlur={() => handleBookingBlur('phone')}
                      onChange={(e) => {
                        const masked = formatBrazilPhone(e.target.value);
                        setBookingPhone(masked);
                        if (bookingTouched.phone) {
                          const err = validateBookingField('phone', {
                            name: bookingName,
                            phone: masked,
                            date: bookingDate,
                            time: bookingTime,
                          });
                          setBookingErrors((prev) => ({ ...prev, phone: err }));
                        }
                      }}
                      placeholder="(62) 99999-9999"
                      className={`${inputBaseClass} tabular-nums ${
                        bookingErrors.phone
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#D4D4CE] dark:border-white/15 focus:border-[#2ECC71]'
                      }`}
                    />
                    {bookingErrors.phone && (
                      <p
                        id="booking-phone-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{bookingErrors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#2ECC71] px-6 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#27AE60] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Confirmar Horário de Consulta
                </button>
              </form>
            )}
          </Reveal>

          {/* Formulário de Contato + Informações Diretas */}
          <Reveal delay={0.14} className="lg:col-span-5 space-y-6">
            <div
              id="contato"
              className="rounded-xl border border-[#E2E2DE] dark:border-white/10 bg-white dark:bg-[#222222] p-6 sm:p-8 scroll-mt-24"
            >
              <div className="border-b border-[#E2E2DE] dark:border-white/10 pb-5 mb-6">
                <h3 className="font-display text-2xl font-semibold text-[#1A1A1A] dark:text-[#F5F5F3]">
                  Formulário de Contato
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  Envie sua mensagem diretamente por WhatsApp ou e-mail
                </p>
              </div>

              {contactChannel ? (
                <div className="space-y-5">
                  <div className="rounded-lg border border-[#2ECC71]/60 dark:border-[#2ECC71]/40 bg-[#F7F7F5] dark:bg-[#1A1A1A] p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[#15803D] dark:text-[#2ECC71]">
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="text-sm font-semibold">
                        Mensagem validada e pronta para envio
                      </span>
                    </div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-line leading-relaxed">
                      {contactSummaryText}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {contactChannel === 'whatsapp' ? (
                      <a
                        href={contactWaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#2ECC71] px-5 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#27AE60] transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Abrir conversa no WhatsApp
                      </a>
                    ) : (
                      <a
                        href={contactMailtoHref}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#2ECC71] px-5 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#27AE60] transition-colors"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        Abrir aplicativo de E-mail
                      </a>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleCopyContactMessage}
                        className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-md border border-black/15 dark:border-white/15 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:border-[#15803D] dark:hover:border-[#2ECC71] transition-colors cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        {copiedMessage ? 'Copiada' : 'Copiar texto'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setContactChannel(null)}
                        className="inline-flex min-h-[40px] items-center justify-center rounded-md border border-black/15 dark:border-white/15 px-3 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-black/40 dark:hover:border-white/40 transition-colors cursor-pointer"
                      >
                        Editar mensagem
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleContactSubmit('whatsapp');
                  }}
                  noValidate
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      Nome *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactName}
                      aria-invalid={Boolean(contactErrors.name)}
                      aria-describedby={contactErrors.name ? 'contact-name-error' : undefined}
                      onBlur={() => handleContactBlur('name')}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContactName(val);
                        if (contactTouched.name) {
                          const err = validateContactField('name', {
                            name: val,
                            email: contactEmail,
                            message: contactMessage,
                          });
                          setContactErrors((prev) => ({ ...prev, name: err }));
                        }
                      }}
                      placeholder="Seu nome completo"
                      className={`${inputBaseClass} ${
                        contactErrors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#D4D4CE] dark:border-white/15 focus:border-[#2ECC71]'
                      }`}
                    />
                    {contactErrors.name && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{contactErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                    >
                      E-mail *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      aria-invalid={Boolean(contactErrors.email)}
                      aria-describedby={contactErrors.email ? 'contact-email-error' : undefined}
                      onBlur={() => handleContactBlur('email')}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContactEmail(val);
                        if (contactTouched.email) {
                          const err = validateContactField('email', {
                            name: contactName,
                            email: val,
                            message: contactMessage,
                          });
                          setContactErrors((prev) => ({ ...prev, email: err }));
                        }
                      }}
                      placeholder="seuemail@exemplo.com"
                      className={`${inputBaseClass} ${
                        contactErrors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#D4D4CE] dark:border-white/15 focus:border-[#2ECC71]'
                      }`}
                    />
                    {contactErrors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{contactErrors.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                      >
                        Mensagem *
                      </label>
                      <span className="text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400">
                        {contactMessage.trim().length} / 1000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      maxLength={1000}
                      value={contactMessage}
                      aria-invalid={Boolean(contactErrors.message)}
                      aria-describedby={contactErrors.message ? 'contact-message-error' : undefined}
                      onBlur={() => handleContactBlur('message')}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContactMessage(val);
                        if (contactTouched.message) {
                          const err = validateContactField('message', {
                            name: contactName,
                            email: contactEmail,
                            message: val,
                          });
                          setContactErrors((prev) => ({ ...prev, message: err }));
                        }
                      }}
                      placeholder="Descreva resumidamente o seu caso ou dúvida jurídica..."
                      className={`w-full rounded-lg border bg-[#F7F7F5] dark:bg-[#1A1A1A] px-3.5 py-2.5 text-sm text-[#1A1A1A] dark:text-[#F5F5F3] placeholder:text-neutral-500 focus:outline-none resize-y transition-colors ${
                        contactErrors.message
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-[#D4D4CE] dark:border-white/15 focus:border-[#2ECC71]'
                      }`}
                    />
                    {contactErrors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{contactErrors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#2ECC71] px-4 py-2.5 text-sm font-semibold text-[#1A1A1A] hover:bg-[#27AE60] transition-colors cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleContactSubmit('email')}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-black/20 dark:border-white/20 px-4 py-2.5 text-sm font-medium text-[#1A1A1A] dark:text-[#F5F5F3] hover:border-[#15803D] dark:hover:border-[#2ECC71] hover:text-[#15803D] dark:hover:text-[#2ECC71] transition-colors cursor-pointer"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Via E-mail</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="rounded-xl border border-[#E2E2DE] dark:border-white/10 bg-white dark:bg-[#222222] p-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  className="h-4 w-4 text-[#15803D] dark:text-[#2ECC71] mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#1A1A1A] dark:text-[#F5F5F3]">Endereço</p>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-[#E2E2DE] dark:border-white/10 pt-4">
                <Phone
                  className="h-4 w-4 text-[#15803D] dark:text-[#2ECC71] mt-1 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#1A1A1A] dark:text-[#F5F5F3]">
                    Telefone e WhatsApp
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-300 tabular-nums mt-0.5">
                    {BUSINESS_INFO.phoneDisplay}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {BUSINESS_INFO.hours}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
