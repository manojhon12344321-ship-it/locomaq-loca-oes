import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Plus, Minus, Trash2, X, Menu, Phone, MapPin, Clock, MessageCircle, ChevronRight, Check, ClipboardList, Send, AlertTriangle, ArrowRight, CalendarDays, User, Eraser } from "lucide-react";
import logoUrl from "container:///mnt/data/src/assets/493dbf58c3a317be-locamaq_logo_final2.png";
import heroLogoUrl from "container:///mnt/data/src/assets/09170fe04a168459-locamaq_logo_transparent.png";
import betoneiraHeroUrl from "container:///mnt/data/src/assets/7c51a1368a8586bb-betoneira_hero.png";
import andaimeHeroUrl from "container:///mnt/data/src/assets/5b96d72c2eac8a4c-andaime_hero.png";
import sapoHeroUrl from "container:///mnt/data/src/assets/f57920dbc5a4d672-sapo_hero.png";
import serraUrl from "container:///mnt/data/src/assets/6f253acba397537c-serra.jpg";
import politrizUrl from "container:///mnt/data/src/assets/0adbdd54e4ba602d-politriz.jpg";
import andaimeUrl from "container:///mnt/data/src/assets/08a1e5cdc597bcdc-andaime.jpg";
import escoraUrl from "container:///mnt/data/src/assets/6126c3d845a93874-escora.jpg";
import placaUrl from "container:///mnt/data/src/assets/93c8f7dbe17f29df-placa_vibratoria_limpa.png";
import compactadorUrl from "container:///mnt/data/src/assets/935cba707073e5e0-compactador.jpg";
import betoneiraUrl from "container:///mnt/data/src/assets/bc374cfe5c5a8593-betoneira.jpg";
import geradorToyamaUrl from "container:///mnt/data/src/assets/a42ca30bf9578405-toyama.jpg";
import geradorForceUrl from "container:///mnt/data/src/assets/fd961631df80dc1e-force.jpg";
import misturadorUrl from "container:///mnt/data/src/assets/347fb15b74f580f2-misturador.jpg";
import marteleteMakitaUrl from "container:///mnt/data/src/assets/2ede818048a6fd5b-martelete_makita15.jpg";
import vibradorUrl from "container:///mnt/data/src/assets/b5c52557a528a849-vibrador.jpg";
import lixadeiraUrl from "container:///mnt/data/src/assets/d415c82d86ebbee6-lixadeira.jpg";
import marteleteBosch11Url from "container:///mnt/data/src/assets/dac3e331cee715e7-martelete_bosch11.jpg";
import marteleteBosch2Url from "container:///mnt/data/src/assets/bfa869b66e699d3d-martelete_bosch2.jpg";
import lavadoraUrl from "container:///mnt/data/src/assets/90328cbbd883a509-lavadora.jpg";

type Product = { name: string; category: string; photo: string };
const PRODUCTS: Product[] = [
  { name: "Serra Circular Bosch", category: "Corte e Acabamento", photo: serraUrl },
  { name: "Politriz Makita", category: "Corte e Acabamento", photo: politrizUrl },
  { name: "Andaime", category: "Andaimes e Escoras", photo: andaimeUrl },
  { name: "Escora Metálica W8", category: "Andaimes e Escoras", photo: escoraUrl },
  { name: "Placa Vibratória Menegotti", category: "Compactação", photo: placaUrl },
  { name: "Compactador Sapo", category: "Compactação", photo: compactadorUrl },
  { name: "Betoneira", category: "Concreto", photo: betoneiraUrl },
  { name: "Gerador Toyama TG3100CXR", category: "Energia", photo: geradorToyamaUrl },
  { name: "Gerador Force CSM GM 8000e 9000VA", category: "Energia", photo: geradorForceUrl },
  { name: "Misturador de Argamassa", category: "Concreto", photo: misturadorUrl },
  { name: "Martelete Makita 15 Kg", category: "Marteletes", photo: marteleteMakitaUrl },
  { name: "Vibrador de Imersão", category: "Concreto", photo: vibradorUrl },
  { name: "Lixadeira Telescópica Parede e Teto", category: "Corte e Acabamento", photo: lixadeiraUrl },
  { name: "Martelete Bosch 11kg", category: "Marteletes", photo: marteleteBosch11Url },
  { name: "Martelete Bosch 2kg", category: "Marteletes", photo: marteleteBosch2Url },
  { name: "Lavadora de Alta Pressão", category: "Limpeza", photo: lavadoraUrl },
];
const CATEGORIES = ["Todos", "Concreto", "Compactação", "Corte e Acabamento", "Marteletes", "Andaimes e Escoras", "Energia", "Limpeza"];
const WA_BASE = "https://wa.me/5573999174010";
const WA_TEXT_BASE = "https://wa.me/5573999174010?text=";
const waLink = (text: string) => WA_TEXT_BASE + encodeURIComponent(text);

type RentalItem = { id: string; name: string; category: string; qty: number };
type ResItem = { name: string; category: string; qty: number };

async function api(action: string, args: any) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error || `Não foi possível completar a operação (${res.status})`);
  return json.data;
}
function slug(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

function SchedulingNotice() {
  return (
    <div className="flex gap-2.5 bg-[#EAF7EF] border border-[#BFE6CC] rounded-xl p-3.5 text-sm leading-relaxed text-[#145A32]" role="note">
      <MessageCircle size={20} className="text-[#1FA855] shrink-0 mt-0.5" aria-hidden="true" />
      <p className="m-0">Agendamento pelo WhatsApp: após enviar sua reserva, vamos combinar a data de retirada e devolução com você pelo WhatsApp.</p>
    </div>
  );
}

function ProductImage({ name, src }: { name: string; src: string }) {
  return (
    <div style={{ background: "#FFFFFF", aspectRatio: "1 / 1", width: "100%", height: "auto", overflow: "hidden", boxSizing: "border-box", padding: 12, display: "block" }}>
      <img
        src={src}
        alt={name}
        style={{ display: "block", width: "100%", height: "100%", aspectRatio: "1 / 1", objectFit: "contain", objectPosition: "center", background: "#FFFFFF" }}
      />
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<any>(null);

  const [cardQty, setCardQty] = useState<Record<string, number>>({});
  const [resOpen, setResOpen] = useState(false);
  const [resItems, setResItems] = useState<ResItem[]>([]);
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resAddress, setResAddress] = useState("");
  const [resNotes, setResNotes] = useState("");
  const [resCopyStatus, setResCopyStatus] = useState("");
  const [resConfirmed, setResConfirmed] = useState(false);
  const resMsgRef = useRef<HTMLTextAreaElement>(null);
  const [resAddEquip, setResAddEquip] = useState(PRODUCTS[0].name);
  const [justAdded, setJustAdded] = useState("");
  const [addedBanner, setAddedBanner] = useState<{ qty: number; name: string } | null>(null);
  const addedTimers = useRef<any[]>([]);

  function showToast(msg: string) { setToast(msg); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(""), 3200); }

  async function reloadRecords() {
    const data = await api("records.list", { collection: "rental_list" });
    const rows = (data?.records || []).map((r: any) => ({ id: r.id, ...(r.value || {}) })) as RentalItem[];
    rows.sort((a, b) => a.name.localeCompare(b.name));
    setRentals(rows);
    return rows;
  }
  useEffect(() => { (async () => { try { await reloadRecords(); } catch (e: any) { setLoadError(e.message || "Lista indisponível no momento."); } finally { setLoading(false); } })(); }, []);

  const filtered = useMemo(() => PRODUCTS.filter(p => (cat === "Todos" || p.category === cat) && (p.name + " " + p.category).toLowerCase().includes(search.toLowerCase())), [search, cat]);
  const totalQty = rentals.reduce((s, i) => s + i.qty, 0);
  const resTotalQty = resItems.reduce((s, i) => s + i.qty, 0);

  function qtyOf(name: string) { return cardQty[name] || 1; }
  function changeCardQty(name: string, delta: number) {
    setCardQty(prev => ({ ...prev, [name]: Math.max(1, (prev[name] || 1) + delta) }));
  }

  function openReservation(items: ResItem[]) {
    setResItems(items.map(i => ({ ...i, qty: Math.max(1, i.qty) })));
    setResAddEquip(PRODUCTS[0].name);
    setResConfirmed(false);
    setResOpen(true);
    setCartOpen(false);
  }
  function openReservationForProduct(p: Product) {
    openReservation([{ name: p.name, category: p.category, qty: qtyOf(p.name) }]);
  }
  function openReservationForList() {
    if (!rentals.length) { showToast("Sua lista está vazia. Adicione um equipamento primeiro."); return; }
    openReservation(rentals.map(r => ({ name: r.name, category: r.category, qty: r.qty })));
  }
  function closeReservation() { setResOpen(false); }
  function clearReservation() {
    setResName(""); setResPhone(""); setResAddress(""); setResNotes("");
    setResItems(prev => prev.map(i => ({ ...i, qty: 1 })));
    setResCopyStatus("");
    showToast("Formulário limpo");
  }
  function changeResQty(name: string, delta: number) {
    setResItems(prev => prev.map(i => i.name === name ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }
  function removeResItem(name: string) { setResItems(prev => prev.filter(i => i.name !== name)); }
  function addResEquipment() {
    const p = PRODUCTS.find(x => x.name === resAddEquip);
    if (!p) return;
    setResItems(prev => {
      const ex = prev.find(i => i.name === p.name);
      if (ex) return prev.map(i => i.name === p.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name: p.name, category: p.category, qty: 1 }];
    });
  }

  function buildResMessage() {
    const itemsText = resItems.map((r) => `- ${r.qty}x ${r.name}`).join("\n");
    return `Olá! Quero fazer uma reserva na Locomaq\nNome: ${resName.trim() || "Não informado"}\nTelefone: ${resPhone.trim() || "Não informado"}\nEquipamentos:\n${itemsText}\nEndereço de entrega: ${resAddress.trim() || "Não informado"}\nObservações: ${resNotes.trim() || "Não informado"}\nVamos agendar a retirada e devolução pelo WhatsApp!`;
  }

  async function copyResMessage() {
    const field = resMsgRef.current;
    if (!field) return;
    field.focus();
    field.select();
    const text = field.value;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setResCopyStatus("Mensagem copiada. Cole no WhatsApp.");
        return;
      }
    } catch { /* cai para o método alternativo abaixo */ }
    try {
      const ok = document.execCommand("copy");
      setResCopyStatus(ok ? "Mensagem copiada. Cole no WhatsApp." : "Selecione a mensagem e copie manualmente.");
    } catch {
      setResCopyStatus("Selecione a mensagem e copie manualmente.");
    }
  }

  async function createRow(row: Omit<RentalItem, "id">) {
    const data = await api("records.create", { collection: "rental_list", value: row, idempotency_key: `rental-${slug(row.name)}-${row.qty}-${Date.now()}` });
    return data;
  }
  function productPhoto(name: string) {
    return PRODUCTS.find((p) => p.name === name)?.photo || "";
  }
  function closePanelToCatalog() {
    setCartOpen(false);
    setTimeout(() => { document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" }); }, 80);
  }
  async function clearList() {
    if (!rentals.length) return;
    setSavingId("clear-list");
    try {
      for (const item of [...rentals]) {
        await api("records.delete", { collection: "rental_list", id: item.id });
      }
      await reloadRecords();
      showToast("Lista limpa");
    } catch (e: any) { showToast(e.message || "Não foi possível limpar a lista."); }
    finally { setSavingId(null); }
  }
  async function addProduct(p: Product, qtyOverride?: number) {
    setSavingId(p.name);
    try {
      const qtyToAdd = qtyOverride ?? qtyOf(p.name);
      const existing = rentals.find(r => r.name === p.name);
      if (existing) {
        await api("records.replace", { collection: "rental_list", id: existing.id, value: { name: existing.name, category: existing.category, qty: existing.qty + qtyToAdd } });
      } else {
        await createRow({ name: p.name, category: p.category, qty: qtyToAdd });
      }
      await reloadRecords();
      addedTimers.current.forEach((t) => clearTimeout(t));
      addedTimers.current = [];
      setJustAdded(p.name);
      setAddedBanner({ qty: qtyToAdd, name: p.name });
      addedTimers.current.push(setTimeout(() => setJustAdded(""), 1000));
      addedTimers.current.push(setTimeout(() => setAddedBanner(null), 4200));
    } catch (e: any) { showToast(e.message || "Não foi possível adicionar. Tente novamente."); }
    finally { setSavingId(null); }
  }
  async function updateItem(item: RentalItem, patch: Partial<RentalItem>) {
    setSavingId(item.id);
    try {
      const next = { name: item.name, category: item.category, qty: item.qty, ...patch };
      if (next.qty < 1) next.qty = 1;
      await api("records.replace", { collection: "rental_list", id: item.id, value: next });
      await reloadRecords();
    } catch (e: any) { showToast(e.message || "Não foi possível atualizar."); }
    finally { setSavingId(null); }
  }
  async function removeItem(item: RentalItem) {
    setSavingId(item.id);
    try { await api("records.delete", { collection: "rental_list", id: item.id }); await reloadRecords(); showToast(`${item.name} removido`); }
    catch (e: any) { showToast(e.message || "Não foi possível remover."); }
    finally { setSavingId(null); }
  }

  const resMessage = buildResMessage();
  const resWhatsappUrl = `https://wa.me/5573999174010?text=${encodeURIComponent(resMessage)}`;
  const listMessage = rentals.length ? `Olá, Locomaq! Quero orçar minha locação:\n\n${rentals.map((r, i) => `${i + 1}. ${r.name} — ${r.qty} un.`).join("\n")}\n\nPode confirmar disponibilidade e diária?` : "";
  const listWhatsUrl = waLink(listMessage);

  return (
    <div data-safe-area-inset-root style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }} className="min-h-screen bg-white text-[#1A1A1A] overflow-x-clip">
      {/* TOP BAR */}
      <div className="bg-[#0A0A0A] text-white text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-row items-center justify-between gap-3">
          <a href="tel:+5573999174010" className="flex items-center gap-1.5 font-semibold hover:underline min-w-0"><Phone size={13} className="shrink-0" /><span className="[overflow-wrap:anywhere]">(73) 99917-4010</span></a>
          <span className="flex items-center gap-1.5 min-w-0 text-right"><MapPin size={13} className="shrink-0" /><span className="[overflow-wrap:anywhere]">Teixeira de Freitas - BA</span></span>
        </div>
      </div>

      <header data-safe-area-sticky-top style={{ top: "var(--safe-area-inset-top)" }} className="sticky z-40 bg-white border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-3">
          <a href="#inicio" className="flex items-center min-w-0" aria-label="Locomaq — início">
            <span className="font-extrabold text-[26px] tracking-tight text-[#FF6B00] leading-none">LOCAMAQ</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#1A1A1A]">
            <a href="#catalogo" className="hover:text-[#FF6B00]">Equipamentos</a>
            <a href="#como-funciona" className="hover:text-[#FF6B00]">Como Funciona</a>
            <a href="#contato" className="hover:text-[#FF6B00]">Contato</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setCartOpen(true)} className="relative bg-white border border-[#E8E8E8] rounded-full px-3 py-2 flex items-center gap-2 text-sm font-semibold" aria-label="Abrir sua locação">
              <ClipboardList size={18} className="text-[#FF6B00]" /><span className="hidden sm:inline">Sua Locação</span>
              <span className="bg-[#FF6B00] text-white text-xs min-w-[22px] h-[22px] rounded-full grid place-items-center px-1">{totalQty}</span>
            </button>
            <a href="https://wa.me/5573999174010" target="_blank" rel="noopener" className="hidden md:inline-flex bg-[#FF6B00] hover:bg-[#E85D00] text-white font-bold text-sm px-4 py-2.5 rounded-full items-center gap-1.5"><MessageCircle size={17} /> Orçar no WhatsApp</a>
            <button onClick={() => setMenuOpen(v => !v)} className="lg:hidden p-2 border border-[#E8E8E8] rounded-lg" aria-label="Abrir menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {menuOpen && <div className="lg:hidden border-t border-[#E8E8E8] px-4 py-3 grid gap-1 bg-white">
          {[["#catalogo", "Equipamentos"], ["#como-funciona", "Como Funciona"], ["#contato", "Contato"]].map(([h, l]) => <a key={h} href={h} onClick={() => setMenuOpen(false)} className="py-2.5 font-semibold border-b border-[#F0F0F0] last:border-0 flex justify-between">{l}<ChevronRight size={16} /></a>)}
          <a href={waLink("Olá, Locomaq! Quero orçar equipamentos.")} target="_blank" rel="noopener" className="mt-2 bg-[#FF6B00] text-white text-center rounded-full py-3 font-bold">Orçar no WhatsApp</a>
        </div>}
      </header>

      {/* HERO — MODELO 5: Premium escuro */}
      <section id="inicio" className="relative bg-[#131313] text-white overflow-x-clip">
        {/* Fundo charcoal: grade blueprint + 2 brilhos laranja */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 42px), repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 42px), linear-gradient(180deg, #171717 0%, #121212 55%, #0C0C0C 100%)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute left-[-8%] bottom-[-22%] w-[58%] max-w-[560px] aspect-square rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,0,0.32) 0%, rgba(255,107,0,0.12) 42%, rgba(255,107,0,0) 70%)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-6%] top-[6%] w-[58%] max-w-[620px] aspect-square rounded-full" style={{ background: "radial-gradient(circle, rgba(255,140,40,0.38) 0%, rgba(255,107,0,0.14) 45%, rgba(255,107,0,0) 72%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-9 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-[4.5rem] grid lg:grid-cols-[1.12fr_1fr] gap-10 lg:gap-10 items-center">
          {/* ESQUERDA */}
          <div className="min-w-0 text-left">
            <img src={heroLogoUrl} alt="Locomaq — Locação de Máquinas e Equipamentos" className="w-[280px] sm:w-[350px] lg:w-[380px] max-w-full h-auto object-contain" style={{ display: "block", filter: "drop-shadow(0 14px 28px rgba(255,107,0,0.20)) drop-shadow(0 8px 20px rgba(0,0,0,0.6))" }} />
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#FF8A3D]/60 bg-[#FF6B00]/15 px-3.5 py-2 text-[11px] sm:text-xs font-extrabold tracking-[0.08em] text-[#FFB27A] [overflow-wrap:anywhere]"><span aria-hidden="true" className="text-[#FF8A3D]">★</span> LOCAÇÃO DE EQUIPAMENTOS • TEIXEIRA DE FREITAS - BA</p>
            <h1 className="font-extrabold tracking-tight leading-[0.98] mt-5 text-[clamp(2.75rem,9vw,4.85rem)] text-white [overflow-wrap:anywhere]">Alugue máquinas<br />e equipamentos<br />para <span className="text-[#FF8A3D] underline decoration-[#FF6B00] decoration-[5px] underline-offset-8">sua obra</span></h1>
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#D1D1D1] leading-relaxed max-w-xl [overflow-wrap:anywhere]">Locação segura e confiável para construção, reforma e manutenção. Qualidade, agilidade e suporte completo para o seu projeto.</p>

            <ul className="mt-6 space-y-2.5 text-[15px] sm:text-base font-semibold text-white list-none p-0 m-0">
              <li className="flex items-start gap-2.5"><span className="mt-0.5 inline-grid place-items-center w-6 h-6 shrink-0 rounded-full bg-[#1FA855]/20 text-[#4ADE80]"><Check size={15} strokeWidth={3} /></span><span className="[overflow-wrap:anywhere]">Equipamentos revisados e prontos para uso</span></li>
              <li className="flex items-start gap-2.5"><span className="mt-0.5 inline-grid place-items-center w-6 h-6 shrink-0 rounded-full bg-[#1FA855]/20 text-[#4ADE80]"><Check size={15} strokeWidth={3} /></span><span className="[overflow-wrap:anywhere]">Entrega rápida na sua obra</span></li>
              <li className="flex items-start gap-2.5"><span className="mt-0.5 inline-grid place-items-center w-6 h-6 shrink-0 rounded-full bg-[#1FA855]/20 text-[#4ADE80]"><Check size={15} strokeWidth={3} /></span><span className="[overflow-wrap:anywhere]">Orçamento gratuito no WhatsApp</span></li>
            </ul>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href="#catalogo" className="bg-[#FF6B00] hover:bg-[#E85D00] text-white font-extrabold text-center rounded-full px-8 py-4 sm:py-[18px] text-base sm:text-lg flex items-center justify-center gap-2 shadow-[0_18px_36px_rgba(255,107,0,0.38)]">Ver equipamentos <span aria-hidden="true">→</span></a>
              <a href="https://wa.me/5573999174010" target="_blank" rel="noopener" className="bg-[#1FA855] hover:bg-[#178A45] text-white font-extrabold text-center rounded-full px-8 py-4 sm:py-[18px] text-base sm:text-lg flex items-center justify-center gap-2 shadow-[0_14px_30px_rgba(0,0,0,0.30)]"><MessageCircle size={21} /> Fale no WhatsApp</a>
            </div>

            <div className="mt-8 grid grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
              <div className="px-3 sm:px-5 py-4 text-center sm:text-left"><p className="font-extrabold text-[#FF8A3D] leading-none text-[clamp(1.45rem,5vw,2rem)]">16</p><p className="mt-1.5 text-[11px] sm:text-sm font-bold text-white leading-tight [overflow-wrap:anywhere]">Equipamentos</p></div>
              <div className="px-3 sm:px-5 py-4 text-center sm:text-left border-x border-white/10"><p className="font-extrabold text-[#FF8A3D] leading-none text-[clamp(1.45rem,5vw,2rem)]">Rápida</p><p className="mt-1.5 text-[11px] sm:text-sm font-bold text-white leading-tight [overflow-wrap:anywhere]">Entrega rápida</p></div>
              <div className="px-3 sm:px-5 py-4 text-center sm:text-left"><p className="font-extrabold text-[#FF8A3D] leading-none text-[clamp(1.45rem,5vw,2rem)]">Total</p><p className="mt-1.5 text-[11px] sm:text-sm font-bold text-white leading-tight [overflow-wrap:anywhere]">Suporte completo</p></div>
            </div>
          </div>

          {/* DIREITA — composição profissional */}
          <div className="relative min-w-0 mt-2 lg:mt-0 px-2 sm:px-6 lg:px-0 pt-2 pb-6 lg:pb-8">
            <div className="relative flex items-end justify-center">
              <img src={andaimeHeroUrl} alt="Andaime amarelo" className="relative z-0 block w-[34%] sm:w-[32%] lg:w-[36%] h-auto object-contain -mr-[3%]" style={{ display: "block", filter: "drop-shadow(0 20px 24px rgba(0,0,0,0.45))" }} />
              <img src={betoneiraHeroUrl} alt="Betoneira Menegotti 400L amarela" className="relative z-10 block w-[58%] sm:w-[56%] lg:w-[62%] h-auto object-contain" style={{ display: "block", filter: "drop-shadow(0 26px 32px rgba(0,0,0,0.48))" }} />
              <img src={sapoHeroUrl} alt="Compactador Sapo preto e amarelo" className="relative z-20 block w-[30%] sm:w-[28%] lg:w-[32%] h-auto object-contain -ml-[4%] mb-1" style={{ display: "block", filter: "drop-shadow(0 20px 24px rgba(0,0,0,0.45))" }} />
            </div>


          </div>
        </div>
        {/* Linha laranja fina na base */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF6B00]" />
      </section>

      {/* CATALOG */}
      <section id="catalogo" className="bg-[#F7F7F5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-extrabold tracking-tight text-[clamp(2rem,6vw,3rem)] leading-none">Equipamentos</h2>
              <p className="text-[#5A5A5A] mt-3 max-w-2xl">16 equipamentos disponíveis para locação.</p>
            </div>
            <button onClick={() => setCartOpen(true)} className="bg-white border border-[#E8E8E8] rounded-full px-4 py-2.5 text-sm font-bold flex items-center gap-2">Sua Locação <span className="bg-[#FF6B00] text-white text-xs min-w-[22px] h-[22px] rounded-full grid place-items-center px-1">{totalQty}</span></button>
          </div>

          <div className="mt-7 bg-white border border-[#E8E8E8] rounded-[12px] p-3 sm:p-4">
            <label className="flex items-center gap-2 bg-white border border-[#E8E8E8] rounded-[10px] px-3 py-3"><Search className="text-[#FF6B00] shrink-0" size={20} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar equipamento..." className="w-full bg-transparent outline-none text-[#1A1A1A] placeholder:text-[#999] font-medium" /></label>
            <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">{CATEGORIES.map(c => <button key={c} onClick={() => setCat(c)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border ${cat === c ? "bg-[#FF6B00] text-white border-[#FF6B00]" : "bg-white text-[#5A5A5A] border-[#E8E8E8]"}`}>{c}</button>)}</div>
            <p className="text-xs text-[#5A5A5A] mt-2">{filtered.length} equipamento(s) encontrado(s){cat !== "Todos" && ` em ${cat}`}.</p>
          </div>

          {loadError && <div className="mt-4 bg-[#FFF4F0] border border-red-200 rounded-xl p-3 text-sm flex gap-2 text-[#7A1A1A]"><AlertTriangle size={18} className="text-red-500 shrink-0" />{loadError}</div>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {filtered.map(p => (
              <article key={p.name} className={`bg-white border border-[#E8E8E8] rounded-[12px] overflow-hidden flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.03)] ${justAdded === p.name ? "flash-card ring-2 ring-[#FF6B00]" : ""}`}>
                <ProductImage name={p.name} src={p.photo} />
                <div className="p-5 flex flex-col flex-1 bg-white">
                  <span className="text-[11px] font-bold tracking-wide uppercase text-[#FF6B00]">{p.category}</span>
                  <h3 className="font-bold text-xl leading-tight mt-1.5 text-[#1A1A1A] [overflow-wrap:anywhere]">{p.name}</h3>
                  <p className="text-sm text-[#5A5A5A] mt-2">Sob consulta no WhatsApp</p>

                  <div className="flex items-center justify-between mt-4 bg-[#F7F7F5] border border-[#E8E8E8] rounded-full px-2 py-1.5">
                    <span className="text-xs font-bold text-[#5A5A5A] pl-2">Quantidade</span>
                    <span className="flex items-center gap-1">
                      <button type="button" onClick={() => changeCardQty(p.name, -1)} disabled={qtyOf(p.name) <= 1} aria-label={`Diminuir quantidade de ${p.name}`} className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] grid place-items-center disabled:opacity-40"><Minus size={15} /></button>
                      <strong className="min-w-[24px] text-center" aria-live="polite">{qtyOf(p.name)}</strong>
                      <button type="button" onClick={() => changeCardQty(p.name, 1)} aria-label={`Aumentar quantidade de ${p.name}`} className="w-8 h-8 rounded-full bg-white border border-[#E8E8E8] grid place-items-center"><Plus size={15} /></button>
                    </span>
                  </div>

                  <div className="mt-3">
                    <button onClick={() => addProduct(p)} disabled={savingId === p.name} className="w-full bg-[#FF6B00] hover:bg-[#E85D00] text-white rounded-full py-3.5 font-bold text-base flex items-center justify-center gap-1.5 disabled:opacity-60">{justAdded === p.name ? <Check size={18} /> : <Plus size={18} />} {savingId === p.name ? "Salvando..." : justAdded === p.name ? "Adicionado ✓" : "Adicionar equipamento"}</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="text-center py-12 bg-white rounded-[12px] border border-[#E8E8E8] mt-6"><h3 className="font-bold text-xl">Nenhum equipamento encontrado</h3><p className="text-[#5A5A5A] text-sm mt-1">Tente outro termo ou chame no WhatsApp.</p><button onClick={() => { setSearch(""); setCat("Todos"); }} className="mt-4 bg-[#FF6B00] text-white px-5 py-2.5 rounded-full font-bold">Ver todos</button></div>}
        </div>
      </section>

      {/* NOSSO ESTOQUE */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 items-center">
          <div className="bg-white border border-[#E8E8E8] rounded-[12px] p-2 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
            <img src={betoneiraUrl} alt="Betoneira" style={{ display: "block", width: "100%", height: "auto", aspectRatio: "1 / 1", objectFit: "contain", objectPosition: "center", background: "#FFFFFF" }} className="w-full rounded-[8px]" />
          </div>
          <div>
            <h2 className="font-extrabold tracking-tight text-[clamp(1.9rem,5vw,2.8rem)] leading-tight">Nosso Estoque</h2>
            <p className="text-[#5A5A5A] mt-3 leading-relaxed">Betoneiras prontas para locação, com atendimento local em Teixeira de Freitas.</p>
            <div className="mt-5 space-y-3">
              {["Monte sua lista em poucos minutos", "Equipamentos revisados e prontos para uso", "Retirada no Castelinho ou entrega combinada no atendimento"].map(t => <p key={t} className="flex gap-2 text-sm sm:text-base"><Check size={19} className="text-[#1FA855] shrink-0 mt-0.5" /><span>{t}</span></p>)}
            </div>
            <a href="#catalogo" className="inline-flex mt-6 bg-[#FF6B00] hover:bg-[#E85D00] text-white font-bold rounded-full px-6 py-3">Ver equipamentos</a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="bg-[#F7F7F5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-extrabold tracking-tight text-[clamp(2rem,6vw,3rem)]">Como Funciona</h2>
          <p className="text-[#5A5A5A] mt-2 max-w-xl">Um processo simples, do pedido à obra.</p>
          <div className="grid sm:grid-cols-3 gap-5 mt-7">
            {[
              { n: "1", t: "Escolha o equipamento", d: "Navegue no catálogo e monte sua lista com quantidade." },
              { n: "2", t: "Chame no WhatsApp", d: "Envie sua lista pronta e receba confirmação de disponibilidade." },
              { n: "3", t: "Retire ou receba e use", d: "Retire no Castelinho ou combine a entrega e use na obra." },
            ].map(s => (
              <div key={s.n} className="bg-white border border-[#E8E8E8] rounded-[12px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                <span className="inline-grid place-items-center w-10 h-10 rounded-full bg-[#FFF1E6] text-[#FF6B00] font-extrabold">{s.n}</span>
                <h3 className="font-bold text-xl mt-4">{s.t}</h3>
                <p className="text-[#5A5A5A] text-sm mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contato" className="bg-[#F7F7F5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-6">
          <div>
            <h2 className="font-extrabold tracking-tight text-[clamp(2rem,6vw,3rem)] leading-tight">Contato e localização</h2>
            <p className="text-[#5A5A5A] mt-3">Fale com a Locomaq pelo WhatsApp ou por telefone.</p>
          </div>
          <div className="bg-white border border-[#E8E8E8] rounded-[12px] p-6 sm:p-7">
            <div className="space-y-4 text-sm sm:text-base">
              <p className="flex gap-3"><MapPin className="text-[#FF6B00] shrink-0" size={20} /><span className="[overflow-wrap:anywhere]"><strong>Endereço</strong><br />R. Marizan Cavalcante - Castelinho, Teixeira de Freitas - BA, 45907, Brasil</span></p>
              <p className="flex gap-3"><Clock className="text-[#FF6B00] shrink-0" size={20} /><span><strong>Horário</strong><br />Seg a Sex 07:30–17:30 • Sáb 07:30–12:00 • Dom Fechado</span></p>
              <p className="flex gap-3"><Phone className="text-[#FF6B00] shrink-0" size={20} /><span><strong>Telefone / WhatsApp</strong><br />WhatsApp (73) 99917-4010</span></p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-5">
              <a href="tel:+5573999174010" className="bg-[#1A1A1A] text-white rounded-full py-3 text-center font-bold flex items-center justify-center gap-1.5"><Phone size={16} /> Ligar</a>
              <a href="https://wa.me/5573999174010" target="_blank" rel="noopener" className="bg-[#1FA855] text-white rounded-full py-3 text-center font-bold flex items-center justify-center gap-1.5"><MessageCircle size={16} /> WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#121212] text-white relative overflow-x-clip">
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF6B00]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-16 sm:pb-10">
          <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {/* 1 — LOCAMAQ */}
            <div className="min-w-0">
              <a href="#inicio" className="inline-block" aria-label="Locomaq — início">
                <span className="font-extrabold text-[30px] sm:text-[32px] tracking-tight text-[#FF6B00] leading-none">LOCAMAQ</span>
              </a>
              <p className="mt-5 text-[15px] sm:text-base leading-relaxed text-[#D1D1D1] [overflow-wrap:anywhere]">Aluguel de máquinas e equipamentos para sua obra em Teixeira de Freitas - BA. Qualidade, agilidade e suporte completo.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-white"><Check size={14} className="text-[#4ADE80] shrink-0" /> Equipamentos revisados</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-white"><Check size={14} className="text-[#4ADE80] shrink-0" /> Entrega rápida</span>
              </div>
            </div>

            {/* 2 — EQUIPAMENTOS */}
            <nav className="min-w-0" aria-label="Equipamentos">
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-[#FF8A3D]">EQUIPAMENTOS</h3>
              <ul className="mt-5 space-y-1 list-none p-0 m-0">
                {["Betoneira", "Andaime", "Gerador", "Martelete", "Compactador Sapo", "Placa Vibratória"].map((item) => (
                  <li key={item}>
                    <a href="#catalogo" className="group flex items-center justify-between gap-2 py-2 text-[15px] sm:text-base font-medium text-[#E5E5E5] hover:text-white border-b border-white/10 last:border-0">
                      <span className="[overflow-wrap:anywhere]">{item}</span>
                      <ChevronRight size={16} className="shrink-0 text-[#FF8A3D] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#catalogo" className="group flex items-center gap-1.5 py-2.5 text-[15px] sm:text-base font-extrabold text-[#FF8A3D] hover:text-[#FFB27A]">
                    <span className="[overflow-wrap:anywhere]">Ver todos os equipamentos</span>
                    <ArrowRight size={17} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>

            {/* 3 — CONTATO */}
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-[#FF8A3D]">CONTATO</h3>
              <div className="mt-5 space-y-4">
                <a href="tel:+5573999174010" className="flex items-start gap-3 text-[15px] sm:text-base hover:text-white">
                  <span className="mt-0.5 inline-grid place-items-center w-9 h-9 shrink-0 rounded-full bg-[#FF6B00]/15 text-[#FF8A3D]"><Phone size={17} aria-hidden="true" /></span>
                  <span className="leading-relaxed [overflow-wrap:anywhere]"><strong className="font-extrabold text-white">WhatsApp / Telefone</strong><br />(73) 99917-4010</span>
                </a>
                <p className="flex items-start gap-3 text-[15px] sm:text-base leading-relaxed text-[#D1D1D1]">
                  <span className="mt-0.5 inline-grid place-items-center w-9 h-9 shrink-0 rounded-full bg-[#FF6B00]/15 text-[#FF8A3D]"><MapPin size={17} aria-hidden="true" /></span>
                  <span className="[overflow-wrap:anywhere]"><strong className="font-extrabold text-white">Endereço</strong><br />R. Marizan Cavalcante - Castelinho, Teixeira de Freitas - BA</span>
                </p>
              </div>
              <div className="mt-6 grid gap-2.5">
                <a href="https://wa.me/5573999174010" target="_blank" rel="noopener" className="bg-[#1FA855] hover:bg-[#178A45] text-white font-extrabold text-center rounded-full px-5 py-3.5 text-[15px] flex items-center justify-center gap-2"><MessageCircle size={19} aria-hidden="true" /> Fale no WhatsApp</a>
                <a href="#catalogo" className="bg-[#FF6B00] hover:bg-[#E85D00] text-white font-extrabold text-center rounded-full px-5 py-3.5 text-[15px] flex items-center justify-center gap-2">Ver equipamentos <span aria-hidden="true">→</span></a>
              </div>
            </div>

            {/* 4 — ATENDIMENTO */}
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold tracking-[0.14em] text-[#FF8A3D]">ATENDIMENTO</h3>
              <div className="mt-5 space-y-4">
                <p className="flex items-start gap-3 text-[15px] sm:text-base leading-relaxed text-[#D1D1D1]">
                  <span className="mt-0.5 inline-grid place-items-center w-9 h-9 shrink-0 rounded-full bg-[#FF6B00]/15 text-[#FF8A3D]"><Clock size={17} aria-hidden="true" /></span>
                  <span className="[overflow-wrap:anywhere]"><strong className="font-extrabold text-white">Segunda a Sexta</strong><br />7h às 18h</span>
                </p>
                <p className="flex items-start gap-3 text-[15px] sm:text-base leading-relaxed text-[#D1D1D1]">
                  <span className="mt-0.5 inline-grid place-items-center w-9 h-9 shrink-0 rounded-full bg-[#FF6B00]/15 text-[#FF8A3D]"><Clock size={17} aria-hidden="true" /></span>
                  <span className="[overflow-wrap:anywhere]"><strong className="font-extrabold text-white">Sábado</strong><br />7h às 12h</span>
                </p>
                <p className="text-[15px] sm:text-base leading-relaxed text-[#D1D1D1] border-t border-white/10 pt-4 [overflow-wrap:anywhere]">Orçamento gratuito no WhatsApp. Agendamento da entrega e retirada combinado pelo WhatsApp.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-sm sm:text-[15px] text-[#B5B5B5] [overflow-wrap:anywhere]">© Locomaq - Locação de Equipamentos • Teixeira de Freitas - BA</p>
            <p className="text-sm sm:text-[15px] font-bold text-[#FF8A3D] shrink-0">Feito para sua obra</p>
          </div>
        </div>
      </footer>

      {/* PAINEL IMERSIVO — MINHA LISTA DE RESERVA */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto pt-[max(1rem,var(--safe-area-inset-top))] bg-black/60" role="dialog" aria-modal="true" aria-label="Sua lista de reserva">
          <div className="min-h-full flex items-end sm:items-stretch justify-end">
            <div className="w-full sm:max-w-[620px] bg-white text-[#1A1A1A] border-l border-[#E8E8E8] shadow-2xl flex flex-col min-h-full panel-slide">
              <div className="sticky top-0 z-10 p-5 pb-4 flex items-start justify-between gap-3 border-b border-[#E8E8E8] bg-white"><div><p className="text-xs font-bold tracking-widest text-[#FF6B00]">SUA LISTA DE RESERVA</p><h3 className="font-extrabold text-2xl leading-tight mt-1">Sua lista de reserva</h3><p className="text-sm text-[#5A5A5A] mt-1">{totalQty} item(ns) • salva automaticamente • não zera até você finalizar ou limpar</p></div><button onClick={() => setCartOpen(false)} className="p-2.5 rounded-full border border-[#E8E8E8] bg-white shrink-0" aria-label="Fechar lista"><X size={20} /></button></div>
              {rentals.length > 0 && (
                <div className="px-4 sm:px-5 pt-4 flex items-center justify-between gap-2">
                  <button onClick={clearList} disabled={savingId === "clear-list"} className="text-sm font-bold text-red-600 flex items-center gap-1.5 px-3 py-2.5 rounded-full border border-red-200 bg-white disabled:opacity-60"><Trash2 size={16} /> {savingId === "clear-list" ? "Limpando..." : "Limpar lista"}</button>
                  <button onClick={closePanelToCatalog} className="text-sm font-bold px-3 py-2.5 rounded-full border border-[#E8E8E8] bg-white">Continuar escolhendo</button>
                </div>
              )}
              <div className="p-4 sm:p-5 space-y-4 flex-1">
                {loading && <p className="text-[#5A5A5A] text-sm">Carregando sua lista...</p>}
                {!loading && rentals.length === 0 && <div className="text-center py-8"><p className="font-bold">Sua lista está vazia</p><p className="text-sm text-[#5A5A5A]">Adicione equipamentos do catálogo para montar sua reserva. A lista fica salva até você finalizar ou limpar.</p><button onClick={closePanelToCatalog} className="mt-4 bg-[#FF6B00] text-white px-5 py-2.5 rounded-full font-bold text-sm">Continuar escolhendo</button></div>}
                {rentals.map(item => (
                  <article key={item.id} className="bg-white border border-[#E8E8E8] rounded-[16px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                    <div className="relative bg-white">
                      <img src={productPhoto(item.name)} alt={item.name} style={{ display: "block", width: "100%", height: "auto", aspectRatio: "16 / 9", objectFit: "contain", objectPosition: "center", background: "#FFFFFF" }} className="w-full" />
                      <span className="absolute left-3 top-3 bg-white/95 rounded-full px-3 py-1 text-xs font-bold text-[#FF6B00]">{item.category}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2"><h4 className="font-bold text-lg leading-tight [overflow-wrap:anywhere]">{item.name}</h4><span className="text-xs font-bold text-[#5A5A5A] shrink-0 pt-1">Sob consulta</span></div>
                      <div className="mt-4">
                        <div><p className="text-[11px] uppercase tracking-wide font-bold text-[#5A5A5A]">Quantidade</p><div className="flex items-center gap-2 mt-1.5"><button onClick={() => updateItem(item, { qty: item.qty - 1 })} disabled={item.qty <= 1 || savingId === item.id} className="w-11 h-11 rounded-full bg-white border border-[#E8E8E8] grid place-items-center disabled:opacity-40" aria-label={`Diminuir quantidade de ${item.name}`}><Minus size={18} /></button><strong className="min-w-[28px] text-center text-lg" aria-live="polite">{item.qty}</strong><button onClick={() => updateItem(item, { qty: item.qty + 1 })} disabled={savingId === item.id} className="w-11 h-11 rounded-full bg-white border border-[#E8E8E8] grid place-items-center" aria-label={`Aumentar quantidade de ${item.name}`}><Plus size={18} /></button></div></div>
                      </div>
                      <button onClick={() => removeItem(item)} disabled={savingId === item.id} className="mt-4 w-full py-2.5 text-sm font-bold text-red-600 border border-red-200 rounded-full">Remover item</button>
                    </div>
                  </article>
                ))}
                {rentals.length > 0 && <a href={listWhatsUrl} target="_blank" rel="noopener noreferrer" className="w-full border-2 border-[#1FA855] text-[#1FA855] rounded-full py-3 font-bold flex items-center justify-center gap-2"><MessageCircle size={18} /> Enviar lista no WhatsApp</a>}
              </div>
              <div className="bg-white border-t border-[#E8E8E8] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 text-sm" aria-live="polite"><span className="font-bold">{totalQty} itens • Sob consulta</span><span className="text-[#5A5A5A]">Total estimado</span></div>
                <p className="text-xs text-[#5A5A5A] mt-1">Sua lista fica salva até você finalizar ou limpar.</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button onClick={closePanelToCatalog} className="bg-white border-2 border-[#1A1A1A] rounded-full py-3.5 font-bold text-sm sm:text-base flex items-center justify-center gap-1.5">Adicionar mais produtos</button>
                  <button onClick={openReservationForList} disabled={!rentals.length} className="bg-[#FF6B00] hover:bg-[#E85D00] text-white rounded-full py-3.5 font-bold text-sm sm:text-base flex items-center justify-center gap-1.5 disabled:opacity-50"><CalendarDays size={18} /> Reservar agora</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESERVATION FORM — fica na tela até fechar ou finalizar */}
      {resOpen && (
        <div className="fixed inset-0 z-[70] bg-black/50" role="dialog" aria-modal="true" aria-label="Formulário de reserva" style={{ display: "flex", flexDirection: "column", height: "100dvh", maxHeight: "100dvh", overflow: "hidden", boxSizing: "border-box" }}>
          <div className="w-full max-w-2xl mx-auto bg-white text-[#1A1A1A] shadow-2xl" style={{ display: "flex", flexDirection: "column", height: "100%", maxHeight: "100%", overflow: "hidden" }}>
            <div className="p-5 sm:p-6 flex items-start justify-between gap-3 border-b border-[#E8E8E8] bg-[#FFF7F0] shrink-0">
              <div>
                <p className="text-xs font-bold tracking-widest text-[#FF6B00]">FORMULÁRIO DE RESERVA</p>
                <h3 className="font-extrabold text-2xl leading-tight mt-1">Finalizar reserva</h3>
                <p className="text-sm text-[#5A5A5A] mt-1">Preencha os dados — o formulário fica aberto até você fechar ou finalizar.</p>
              </div>
              <button onClick={closeReservation} className="p-2.5 rounded-full border border-[#E8E8E8] bg-white shrink-0" aria-label="Fechar formulário de reserva"><X size={20} /></button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 20, paddingBottom: 24 }}>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="grid gap-1 text-sm font-semibold sm:col-span-2"><span className="flex items-center gap-1.5"><User size={15} className="text-[#FF6B00]" /> Nome completo</span><input value={resName} onChange={e => setResName(e.target.value)} placeholder="Seu nome completo" className="border border-[#E8E8E8] rounded-[10px] px-3 py-3.5 text-base font-normal outline-none focus:border-[#FF6B00] bg-white text-[#1A1A1A]" /></label>
                <label className="grid gap-1 text-sm font-semibold sm:col-span-2"><span className="flex items-center gap-1.5"><Phone size={15} className="text-[#FF6B00]" /> Telefone / WhatsApp</span><input value={resPhone} onChange={e => setResPhone(e.target.value)} placeholder="(73) 99999-9999" inputMode="tel" className="border border-[#E8E8E8] rounded-[10px] px-3 py-3.5 text-base font-normal outline-none focus:border-[#FF6B00] bg-white text-[#1A1A1A]" /></label>
                <label className="grid gap-1 text-sm font-semibold sm:col-span-2"><span className="flex items-center gap-1.5"><MapPin size={15} className="text-[#FF6B00]" /> Endereço de entrega <span className="text-[#999] font-normal">(opcional)</span></span><input value={resAddress} onChange={e => setResAddress(e.target.value)} placeholder="Rua, número, bairro — ou deixe em branco para retirar no local" className="border border-[#E8E8E8] rounded-[10px] px-3 py-3.5 text-base font-normal outline-none focus:border-[#FF6B00] bg-white text-[#1A1A1A]" /></label>
                <label className="grid gap-1 text-sm font-semibold sm:col-span-2">Observações<textarea value={resNotes} onChange={e => setResNotes(e.target.value)} placeholder="Ex.: preciso na obra às 8h, bairro..." rows={3} className="border border-[#E8E8E8] rounded-[10px] px-3 py-3.5 text-base font-normal outline-none resize-none [overflow-wrap:anywhere] bg-white text-[#1A1A1A]" /></label>
              </div>

              <div className="mt-4">
                <SchedulingNotice />
              </div>

              <div className="mt-4 bg-white border border-[#E8E8E8] rounded-xl p-4">
                <h4 className="font-extrabold text-base">Como funciona:</h4>
                <ol className="mt-3 space-y-3 list-none">
                  <li className="flex gap-3"><span className="shrink-0 inline-grid place-items-center w-8 h-8 rounded-full bg-[#FFF1E6] text-[#FF6B00] font-extrabold text-sm">1</span><span className="text-sm sm:text-base leading-snug pt-1">Você envia sua reserva</span></li>
                  <li className="flex gap-3"><span className="shrink-0 inline-grid place-items-center w-8 h-8 rounded-full bg-[#FFF1E6] text-[#FF6B00] font-extrabold text-sm">2</span><span className="text-sm sm:text-base leading-snug pt-1">A gente confirma a disponibilidade</span></li>
                  <li className="flex gap-3"><span className="shrink-0 inline-grid place-items-center w-8 h-8 rounded-full bg-[#FFF1E6] text-[#FF6B00] font-extrabold text-sm">3</span><span className="text-sm sm:text-base leading-snug pt-1">Combinamos retirada e devolução pelo WhatsApp</span></li>
                  <li className="flex gap-3"><span className="shrink-0 inline-grid place-items-center w-8 h-8 rounded-full bg-[#FFF1E6] text-[#FF6B00] font-extrabold text-sm">4</span><span className="text-sm sm:text-base leading-snug pt-1">Entrega / retirada do equipamento</span></li>
                </ol>
              </div>

              <h4 className="font-bold mt-5">Equipamento(s)</h4>
              <div className="mt-2 space-y-2">
                {resItems.map(item => (
                  <div key={item.name} className="flex items-center justify-between gap-2 bg-[#F7F7F5] border border-[#E8E8E8] rounded-xl p-3">
                    <div className="min-w-0"><p className="font-bold leading-tight [overflow-wrap:anywhere]">{item.name}</p><p className="text-xs text-[#5A5A5A]">{item.category}</p></div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="flex items-center gap-1">
                        <button type="button" onClick={() => changeResQty(item.name, -1)} disabled={item.qty <= 1} aria-label={`Diminuir ${item.name}`} className="w-9 h-9 rounded-full bg-white border border-[#E8E8E8] grid place-items-center disabled:opacity-40"><Minus size={15} /></button>
                        <strong className="min-w-[24px] text-center" aria-live="polite">{item.qty}</strong>
                        <button type="button" onClick={() => changeResQty(item.name, 1)} aria-label={`Aumentar ${item.name}`} className="w-9 h-9 rounded-full bg-white border border-[#E8E8E8] grid place-items-center"><Plus size={15} /></button>
                      </span>
                      <button type="button" onClick={() => removeResItem(item.name)} className="text-red-600 p-1" aria-label={`Remover ${item.name} da reserva`}><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
                {resItems.length === 0 && <p className="text-sm text-[#5A5A5A] bg-[#F7F7F5] rounded-xl p-3">Nenhum equipamento. Adicione um abaixo.</p>}
              </div>
              <div className="flex gap-2 mt-3">
                <label className="sr-only" htmlFor="res-add-equip">Adicionar equipamento</label>
                <select id="res-add-equip" value={resAddEquip} onChange={e => setResAddEquip(e.target.value)} className="flex-1 min-w-0 border border-[#E8E8E8] rounded-[10px] px-3 py-3.5 text-base bg-white outline-none text-[#1A1A1A]">
                  {PRODUCTS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
                <button type="button" onClick={addResEquipment} className="shrink-0 bg-white border border-[#1A1A1A] rounded-full px-4 py-3 font-bold text-sm flex items-center gap-1"><Plus size={16} /> Adicionar</button>
              </div>

              <div className="mt-4 bg-[#FFF1E6] border border-[#FFD9B8] rounded-xl p-4 grid grid-cols-2 gap-2 text-center" aria-live="polite">
                <div><p className="font-extrabold text-xl">{resTotalQty}</p><p className="text-xs text-[#5A5A5A]">item(ns)</p></div>
                <div><p className="font-extrabold text-xl">Sob consulta</p><p className="text-xs text-[#5A5A5A]">valor</p></div>
              </div>
              <p className="text-xs text-[#5A5A5A] mt-2">Resumo atualiza quando você muda a quantidade.</p>
            </div>

            <div style={{ position: "sticky", bottom: 0, background: "#111", padding: 16, borderTop: "1px solid #333", flexShrink: 0, maxHeight: "52dvh", overflowY: "auto" }}>
              <div className="flex flex-col gap-2.5">
                <button type="button" onClick={closeReservation} className="w-full rounded-full py-3.5 font-bold flex items-center justify-center gap-1.5 text-white bg-transparent" style={{ border: "2px solid #E8E8E8" }}><X size={17} /> Fechar</button>
                <button type="button" onClick={clearReservation} className="w-full rounded-full py-3.5 font-bold flex items-center justify-center gap-1.5 text-white bg-transparent" style={{ border: "2px solid #E8E8E8" }}><Eraser size={17} /> Limpar</button>
                <a href={resWhatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setResConfirmed(true)} style={{ display: "flex", width: "100%", background: "#22c55e", color: "white", borderRadius: "9999px", padding: "16px", justifyContent: "center", alignItems: "center", fontWeight: 700 }}><Send size={18} style={{ marginRight: 8 }} /> Finalizar Reserva</a>
                {resConfirmed && (
                  <div className="rounded-xl p-4 bg-[#EAF7EF] border border-[#BFE6CC]" role="status">
                    <p className="m-0 text-sm leading-relaxed text-[#145A32] font-semibold">Recebemos sua reserva! Já vamos conferir a disponibilidade e te confirmar aqui pelo WhatsApp.</p>
                    <p className="m-0 mt-1.5 text-sm leading-relaxed text-[#145A32]">Respondemos em horário comercial, o mais rápido possível.</p>
                  </div>
                )}
                <p className="text-sm text-white text-center m-0">Tem pressa? <a href="tel:+5573999174010" className="font-bold underline" style={{ color: "#4ADE80" }}>Ligue agora: (73) 99917-4010</a></p>
                <a href={resWhatsappUrl} target="_blank" rel="noopener noreferrer" className="text-center text-sm font-bold underline" style={{ color: "#4ADE80" }}>Se o WhatsApp não abrir, toque aqui</a>
                <div className="rounded-xl p-4" style={{ background: "#1A1A1A", border: "1px solid #333" }}>
                  <label className="grid gap-2 text-sm font-semibold text-white">Mensagem pronta para copiar
                    <textarea ref={resMsgRef} readOnly value={resMessage} rows={Math.max(8, resMessage.split("\n").length + 2)} className="border border-[#E8E8E8] rounded-[10px] px-3 py-3 text-sm font-normal bg-white outline-none resize-none [overflow-wrap:anywhere] text-[#1A1A1A]" style={{ height: "auto", overflow: "visible" }} />
                  </label>
                  <button type="button" onClick={copyResMessage} className="mt-3 w-full bg-white text-[#111] rounded-full px-5 py-3 font-bold text-sm">Copiar mensagem</button>
                  {resCopyStatus && <p className="mt-2 text-sm font-semibold text-[#4ADE80]" role="status">{resCopyStatus}</p>}
                </div>
                <p className="text-sm text-white text-center">WhatsApp: (73) 99917-4010</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setCartOpen(true)} className="fixed bottom-5 left-4 z-40 bg-[#1A1A1A] text-white rounded-full pl-4 pr-5 py-3.5 shadow-lg flex items-center gap-2 font-bold text-sm hover:scale-[1.02] transition" aria-label={`Abrir minha lista, ${totalQty} itens`}><ClipboardList size={19} className="text-[#FFB27A]" /> Minha lista ({totalQty})</button>
      <a href="tel:+5573999174010" aria-label="Ligar agora para (73) 99917-4010" className="fixed bottom-5 right-[76px] sm:right-[88px] z-40 h-[56px] rounded-full bg-white border border-[#E8E8E8] shadow-lg flex items-center gap-2 px-4 font-bold text-sm text-[#1A1A1A] hover:scale-[1.02] transition"><Phone size={20} className="text-[#FF6B00]" /> Ligar agora</a>
      <a href="https://wa.me/5573999174010" target="_blank" rel="noopener" aria-label="Chamar no WhatsApp" className="fixed bottom-5 right-4 sm:right-6 z-40 w-[56px] h-[56px] rounded-full bg-[#1FA855] shadow-lg grid place-items-center hover:scale-105 transition"><MessageCircle size={28} className="text-white" /></a>
      {addedBanner && <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] bg-[#1A1A1A] text-white text-sm font-semibold pl-4 pr-2 py-2 rounded-full shadow-2xl max-w-[calc(100vw-2rem)] flex items-center gap-2"><span className="flex items-center gap-1.5"><Check size={17} className="text-[#4ADE80] shrink-0" /><span className="[overflow-wrap:anywhere]">{addedBanner.qty === 1 ? "1 produto adicionado • Ver lista" : `${addedBanner.qty} produtos adicionados • Ver lista`}</span></span><button onClick={() => { setCartOpen(true); setAddedBanner(null); }} className="bg-[#FF6B00] text-white rounded-full px-3 py-1.5 font-bold shrink-0">Ver lista</button><button onClick={() => setAddedBanner(null)} className="p-1.5" aria-label="Fechar aviso"><X size={15} /></button></div>}
      {toast && <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] bg-[#1A1A1A] text-white text-sm font-semibold px-4 py-3 rounded-full shadow-2xl max-w-[calc(100vw-2rem)] text-center [overflow-wrap:anywhere]">{toast}</div>}
    </div>
  );
}
