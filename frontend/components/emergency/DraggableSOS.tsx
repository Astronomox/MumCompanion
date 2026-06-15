"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface DraggableSOSProps {
  onPress: () => void
}

const STORAGE_KEY = "lami-sos-position"
const BTN_SIZE = 56
const EDGE_MARGIN = 12

export function DraggableSOS({ onPress }: DraggableSOSProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [settled, setSettled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const btnRef = useRef<HTMLButtonElement>(null)
  const dragStart = useRef({ mouseX: 0, mouseY: 0, btnX: 0, btnY: 0 })
  const hasMoved = useRef(false)
  const posRef = useRef(pos)
  posRef.current = pos

  // Snap to nearest edge of screen
  const snapToEdge = useCallback((x: number, y: number) => {
    const W = window.innerWidth
    const H = window.innerHeight

    // Clamp to screen bounds
    const cx = Math.max(EDGE_MARGIN, Math.min(W - BTN_SIZE - EDGE_MARGIN, x))
    const cy = Math.max(EDGE_MARGIN, Math.min(H - BTN_SIZE - EDGE_MARGIN - 72, y)) // 72 = bottom nav

    // Distance to each edge
    const distLeft = cx
    const distRight = W - cx - BTN_SIZE
    const distTop = cy
    const distBottom = H - cy - BTN_SIZE - 72

    const minDist = Math.min(distLeft, distRight, distTop, distBottom)

    let snapX = cx
    let snapY = cy

    if (minDist === distLeft) {
      snapX = EDGE_MARGIN
    } else if (minDist === distRight) {
      snapX = W - BTN_SIZE - EDGE_MARGIN
    } else if (minDist === distTop) {
      snapY = EDGE_MARGIN
    } else {
      snapY = H - BTN_SIZE - EDGE_MARGIN - 72
    }

    return { x: snapX, y: snapY }
  }, [])

  // Default position — right side, above bottom nav
  const getDefaultPos = useCallback(() => {
    const W = window.innerWidth
    const H = window.innerHeight
    return {
      x: W - BTN_SIZE - EDGE_MARGIN,
      y: H - BTN_SIZE - EDGE_MARGIN - 80,
    }
  }, [])

  // Init position from storage or default
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const p = JSON.parse(saved)
        // Re-snap in case screen size changed
        setPos(snapToEdge(p.x, p.y))
      } catch {
        setPos(getDefaultPos())
      }
    } else {
      setPos(getDefaultPos())
    }
    setMounted(true)
    setSettled(true)
  }, [getDefaultPos, snapToEdge])

  // ---- POINTER EVENTS ----
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    hasMoved.current = false
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      btnX: posRef.current.x,
      btnY: posRef.current.y,
    }
    setDragging(true)
    setSettled(false)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - dragStart.current.mouseX
    const dy = e.clientY - dragStart.current.mouseY

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      hasMoved.current = true
    }

    const W = window.innerWidth
    const H = window.innerHeight

    const newX = Math.max(0, Math.min(W - BTN_SIZE, dragStart.current.btnX + dx))
    const newY = Math.max(0, Math.min(H - BTN_SIZE - 72, dragStart.current.btnY + dy))

    setPos({ x: newX, y: newY })
  }, [dragging])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    setDragging(false)

    if (!hasMoved.current) {
      // It was a tap, not a drag — open SOS
      setSettled(true)
      onPress()
      return
    }

    // Snap to nearest edge
    const snapped = snapToEdge(posRef.current.x, posRef.current.y)
    setPos(snapped)
    setSettled(true)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapped))
  }, [dragging, onPress, snapToEdge])

  if (!mounted) return null

  return (
    <button
      ref={btnRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      aria-label="Emergency SOS"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: BTN_SIZE,
        height: BTN_SIZE,
        zIndex: 9999,
        touchAction: "none",
        userSelect: "none",
        cursor: dragging ? "grabbing" : "grab",
        transition: settled && !dragging ? "left 0.3s cubic-bezier(0.34,1.56,0.64,1), top 0.3s cubic-bezier(0.34,1.56,0.64,1)" : "none",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #ef4444, #dc2626)",
        border: "none",
        boxShadow: dragging
          ? "0 12px 32px rgba(220,38,38,0.5), 0 0 0 6px rgba(220,38,38,0.15)"
          : "0 4px 20px rgba(220,38,38,0.45), 0 0 0 0px rgba(220,38,38,0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: "0.5px",
        transform: dragging ? "scale(1.12)" : "scale(1)",
        WebkitTransform: dragging ? "scale(1.12)" : "scale(1)",
      }}
    >
      {/* Pulse ring — only when not dragging */}
      {!dragging && (
        <span style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          border: "2px solid rgba(220,38,38,0.4)",
          animation: "sos-ring 2s ease-out infinite",
        }} />
      )}
      <span style={{ position: "relative", zIndex: 1 }}>SOS</span>

      <style>{`
        @keyframes sos-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </button>
  )
}
