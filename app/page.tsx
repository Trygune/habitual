'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Bell, BellOff, Check, ChevronLeft, ChevronRight, Palette, Plus, Trash2, X } from 'lucide-react'

const initialHabits = [
  { id: 1, name: 'Drink water', detail: '8 glasses', completed: true },
  { id: 2, name: 'Morning stretch', detail: '10 minutes', completed: true },
  { id: 3, name: 'Read a book', detail: '20 pages', completed: false },
  { id: 4, name: 'Walk outside', detail: '30 minutes', completed: false },
]

const calendarDays = Array.from({ length: 7 }, (_, index) => index - 2)
const themeColors = ['#111111', '#315c4b', '#3f4d78', '#754b37']

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(date)
}

export default function Page() {
  const [habits, setHabits] = useState(initialHabits)
  const [history, setHistory] = useState<Record<number, typeof initialHabits>>({ 2: initialHabits })
  const [selectedDay, setSelectedDay] = useState(2)
  const [newHabit, setNewHabit] = useState('')
  const [newDetail, setNewDetail] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [removingId, setRemovingId] = useState<number | null>(null)
  const [weekOffset, setWeekOffset] = useState(0)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)
  const [themeIndex, setThemeIndex] = useState(0)
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false)

  const completed = habits.filter((habit) => habit.completed).length
  const progress = habits.length ? Math.round((completed / habits.length) * 100) : 0
  const greeting = useMemo(() => (new Date().getHours() < 12 ? 'Good morning' : 'Good day'), [])

  function toggleHabit(id: number) {
    setHabits((current) => {
      const next = current.map((habit) => habit.id === id ? { ...habit, completed: !habit.completed } : habit)
      setHistory((saved) => ({ ...saved, [selectedDay]: next }))
      if (next.length > 0 && next.every((habit) => habit.completed) && !current.every((habit) => habit.completed)) {
        setShowCelebration(true)
        window.setTimeout(() => setShowCelebration(false), 1800)
      }
      return next
    })
  }

  function selectDay(dayIndex: number) {
    if (dayIndex > 2) return
    setSelectedDay(dayIndex)
    setHabits(history[dayIndex] ?? initialHabits.map((habit) => ({ ...habit, completed: false })))
    setIsAdding(false)
  }

  function goToToday() {
    setWeekOffset(0)
    selectDay(2)
  }

  function addHabit() {
    const name = newHabit.trim()
    if (!name) return
    setHabits((current) => [...current, { id: Date.now(), name, detail: newDetail.trim() || 'Daily habit', completed: false }])
    setNewHabit('')
    setNewDetail('')
    setIsAdding(false)
  }

  function removeHabit(id: number) {
    setRemovingId(id)
    window.setTimeout(() => {
      setHabits((current) => current.filter((habit) => habit.id !== id))
      setRemovingId(null)
    }, 260)
  }

  useEffect(() => {
    const onWindowScroll = () => setIsScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onWindowScroll, { passive: true })
    return () => window.removeEventListener('scroll', onWindowScroll)
  }, [])

  const today = new Date()
  const visibleDays = calendarDays.map((relativeDay) => {
    const date = new Date(today)
    date.setDate(today.getDate() + relativeDay + weekOffset * 7)
    return { relativeDay, date, label: new Intl.DateTimeFormat('en-US', { weekday: 'narrow' }).format(date) }
  })

  return (
    <main onScrollCapture={(event) => { const target = event.target as HTMLElement; setIsScrolled(target.scrollTop > 80 || window.scrollY > 80) }} style={{ '--theme-color': themeColors[themeIndex] } as CSSProperties} className="min-h-screen overflow-y-auto bg-[#ededeb] px-4 py-5 text-[#111111] sm:py-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col overscroll-contain rounded-[2rem] bg-[#f8f8f6] shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
        <header className="flex items-center justify-between px-6 pb-5 pt-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#858581]">{formatDate(visibleDays.find((day) => day.relativeDay + weekOffset * 7 === selectedDay - 2)?.date ?? today)}</p>
            <h1 className="mt-1 flex items-center gap-2 text-[28px] font-semibold tracking-[-0.05em]"><span className="relative inline-flex items-center"><button onClick={() => setIsThemePickerOpen((open) => !open)} aria-label="Open theme color palette" aria-expanded={isThemePickerOpen} className="grid size-6 place-items-center rounded-full text-[#777771] transition-colors hover:bg-[#ededeb] hover:text-[#111]"><Palette size={14} strokeWidth={2.25} /></button>{isThemePickerOpen && <div role="dialog" aria-label="Theme color palette" className="absolute left-0 top-8 z-40 flex gap-2 rounded-2xl border border-[#e5e5e1] bg-white p-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.14)]">{themeColors.map((color, index) => <button key={color} onClick={() => { setThemeIndex(index); setIsThemePickerOpen(false) }} aria-label={`Choose theme color ${index + 1}`} aria-pressed={themeIndex === index} className={`size-6 rounded-full border-2 transition-transform hover:scale-110 ${themeIndex === index ? 'border-[#111] scale-110' : 'border-white shadow-[0_0_0_1px_#d1d1cc]'}`} style={{ backgroundColor: color }} />)}</div>}</span><span>{greeting}, Alex.</span></h1>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={goToToday} aria-label="Go to today" className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition-all ${selectedDay === 2 ? 'pointer-events-none opacity-0' : 'text-[#777771] hover:bg-[#ededeb] hover:text-[#111]'}`}>Today</button>
            <button onClick={() => setNotificationsEnabled((enabled) => !enabled)} aria-label={notificationsEnabled ? 'Mute notifications' : 'Unmute notifications'} className="grid size-10 place-items-center rounded-full text-[#555550] transition-transform hover:bg-[#ededeb] hover:scale-105 active:scale-95">
              {notificationsEnabled ? <Bell size={18} strokeWidth={2} /> : <BellOff size={18} strokeWidth={2} className="text-[#999995]" />}
            </button>
          </div>
        </header>

        <section className="px-6" aria-label="Week overview">
          <div className="flex items-center justify-between border-y border-[#e2e2df] py-4">
            <button aria-label="Previous week" onClick={() => setWeekOffset((value) => value - 1)} className="text-[#8a8a86] transition-colors hover:text-black active:scale-90"><ChevronLeft size={18} /></button>
            <div className="flex flex-1 justify-around overflow-hidden" aria-live="polite">
              {visibleDays.map(({ relativeDay, date, label }) => {
                const dayKey = relativeDay + 2 + weekOffset * 7
                const isSelected = selectedDay === dayKey
                const isFuture = date > today
                const hasHistory = history[dayKey]?.some((habit) => habit.completed)
                return (
                  <button key={date.toISOString()} onClick={() => selectDay(dayKey)} disabled={isFuture} aria-label={`View ${label} ${date.getDate()}`} className={`flex animate-[habit-add_260ms_ease-out] flex-col items-center gap-1.5 ${isFuture ? 'cursor-not-allowed opacity-35' : ''}`}>
                    <span className="text-[10px] font-medium uppercase text-[#999995]">{label}</span>
                    <span className={`grid size-8 place-items-center rounded-full text-xs font-semibold transition-all ${isSelected ? 'text-white shadow-[0_3px_8px_rgba(0,0,0,0.18)]' : hasHistory ? 'bg-[#dededb] text-[#555550]' : 'text-[#999995] hover:bg-[#e8e8e5]'}`} style={isSelected ? { backgroundColor: 'var(--theme-color)' } : undefined}>{date.getDate()}</span>
                  </button>
                )
              })}
            </div>
            <button aria-label="Next week" onClick={() => setWeekOffset((value) => value + 1)} className="text-[#8a8a86] transition-colors hover:text-black active:scale-90"><ChevronRight size={18} /></button>
          </div>
        </section>

        <section style={{ backgroundColor: 'var(--theme-color)' }} className={`sticky top-0 z-20 relative mx-6 mt-6 rounded-2xl text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all duration-500 ${isScrolled ? 'p-3' : 'p-5'} ${showCelebration ? 'habit-complete' : ''}`} aria-label="Daily progress">
          {showCelebration && <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-label="All habits complete">
            {[...Array(8)].map((_, index) => <span key={index} className="celebration-dot absolute left-1/2 top-1/2 size-1.5 rounded-full bg-white" style={{ '--end': `translate(${Math.cos(index * 0.8) * 90}px, ${Math.sin(index * 0.8) * 55}px)` } as CSSProperties} />)}
            <p className="absolute inset-x-0 top-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">All done</p>
          </div>}
          {isScrolled ? (
            <div className="h-1 overflow-hidden rounded-full bg-white/15" aria-label={`${progress}% complete`}>
              <div className="h-full rounded-full bg-white transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/55">Your daily progress</p>
                  <p className="mt-1 text-[26px] font-semibold tracking-[-0.04em]">{completed} <span className="text-base font-normal text-white/45">of {habits.length}</span></p>
                </div>
                <span className="text-2xl font-light tracking-[-0.05em]">{progress}%</span>
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-white transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} /></div>
              <p className="mt-3 text-[11px] text-white/45">Small steps, every day.</p>
            </>
          )}
        </section>

        <section className="flex-1 px-6 pb-6 pt-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight">Today&apos;s habits</h2>
            <span className="text-[11px] font-medium text-[#999995]">{habits.length} total</span>
          </div>
          <div className="space-y-2.5">
            {habits.map((habit) => (
              <div key={habit.id} className={`habit-row group flex items-center gap-3 rounded-2xl border border-[#e5e5e1] bg-white p-3.5 transition-all duration-300 ${removingId === habit.id ? 'habit-removing' : ''} ${habit.completed ? 'habit-done' : ''}`}>
                <button onClick={() => toggleHabit(habit.id)} aria-label={`${habit.completed ? 'Mark' : 'Complete'} ${habit.name}`} className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${habit.completed ? 'border-[#111] bg-[#111] text-white' : 'border-[#d6d6d1] bg-white text-transparent hover:border-[#111]'}`}>
                  <Check size={16} strokeWidth={2.5} />
                </button>
                <button onClick={() => toggleHabit(habit.id)} className="min-w-0 flex-1 text-left">
                  <p className={`truncate text-sm font-medium transition-colors ${habit.completed ? 'text-[#8e8e89] line-through' : 'text-[#171714]'}`}>{habit.name}</p>
                  <p className="mt-0.5 text-[11px] text-[#a0a09b]">{habit.detail}</p>
                </button>
                <button onClick={() => removeHabit(habit.id)} aria-label={`Remove ${habit.name}`} className="grid size-8 place-items-center rounded-full text-[#c0c0bb] opacity-0 transition-all hover:bg-[#f1f1ef] hover:text-[#111] group-hover:opacity-100 focus-visible:opacity-100"><Trash2 size={15} /></button>
              </div>
            ))}
          </div>

          {isAdding ? (
            <div className="habit-add mt-3 flex flex-col gap-2 rounded-2xl border border-[#111] bg-white p-2">
              <input autoFocus value={newHabit} onChange={(event) => setNewHabit(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) addHabit(); if (event.key === 'Escape') setIsAdding(false) }} placeholder="Name your new habit" className="w-full bg-transparent px-2 pt-1 text-sm outline-none placeholder:text-[#aaa]" />
              <input value={newDetail} onChange={(event) => setNewDetail(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) addHabit(); if (event.key === 'Escape') setIsAdding(false) }} placeholder="Add a detail (e.g. 20 minutes)" className="w-full border-t border-[#eeeeeb] bg-transparent px-2 pt-2 text-xs outline-none placeholder:text-[#aaa]" />
              <div className="flex justify-end gap-2 pt-1">
                <button onClick={() => { setIsAdding(false); setNewHabit(''); setNewDetail('') }} className="rounded-xl px-3 py-2 text-xs font-semibold text-[#777771] transition-colors hover:bg-[#f1f1ef] hover:text-[#111]">Cancel</button>
                <button onClick={addHabit} className="rounded-xl bg-[#111] px-3 py-2 text-xs font-semibold text-white transition-transform active:scale-95">Add</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setIsAdding(true)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d4d4cf] py-3.5 text-xs font-semibold text-[#777771] transition-all hover:border-[#111] hover:bg-white hover:text-[#111] active:scale-[0.98]"><Plus size={15} /> Add a habit</button>
          )}
        </section>
        <footer className="border-t border-[#e5e5e1] px-6 py-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-[#aaa9a4]">Build your better days</footer>
      </div>
    </main>
  )
}

