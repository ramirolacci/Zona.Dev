import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { ActionStep } from '../../core/interpreter/CodeRunner';
import type { Direction, Position, TileType, LevelItem } from '../../types/game';
import confetti from 'canvas-confetti';
import { MissionChecklist } from '../ui/MissionChecklist';
import gsap from 'gsap';

// --- GRAPHICS & CANVAS RENDER HELPERS ---

function drawTile(
  ctx: CanvasRenderingContext2D,
  tileType: TileType,
  x: number,
  y: number,
  tileSize: number,
  r: number,
  c: number
) {
  ctx.save();

  if (tileType === 'WALL') {
    // 3D Stone Block Wall
    const shadowH = Math.max(4, tileSize * 0.12);

    // Front shadow face
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x, y + tileSize - shadowH, tileSize, shadowH);

    // Front wall face
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(x, y + tileSize - shadowH * 2, tileSize, shadowH);

    // Top face with linear gradient
    const wallGrad = ctx.createLinearGradient(x, y, x, y + tileSize - shadowH * 2);
    wallGrad.addColorStop(0, '#475569');
    wallGrad.addColorStop(1, '#334155');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(x, y, tileSize, tileSize - shadowH * 2);

    // Bevel highlight outline
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 1, y + 1, tileSize - 2, Math.max(1, tileSize - shadowH * 2 - 2));

    // Stone brick horizontal seam
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.lineWidth = 1;
    const midY = y + (tileSize - shadowH * 2) / 2;
    ctx.beginPath();
    ctx.moveTo(x, midY);
    ctx.lineTo(x + tileSize, midY);
    ctx.stroke();

    // Natural moss accent on select walls
    if ((r * 3 + c * 7) % 4 === 0) {
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(x + tileSize * 0.2, y + tileSize * 0.2, Math.max(1, tileSize * 0.08), 0, Math.PI * 2);
      ctx.arc(x + tileSize * 0.28, y + tileSize * 0.15, Math.max(1, tileSize * 0.06), 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (tileType === 'RIVER') {
    // Animated River Water
    const waterGrad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
    waterGrad.addColorStop(0, '#0284C7');
    waterGrad.addColorStop(1, '#0369A1');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(x, y, tileSize, tileSize);

    // Water ripples
    const now = Date.now() / 400;
    ctx.strokeStyle = 'rgba(125, 211, 252, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const waveY1 = y + tileSize * 0.3 + Math.sin(now + r + c) * 2;
    ctx.moveTo(x + 4, waveY1);
    ctx.quadraticCurveTo(x + tileSize / 2, waveY1 + 4, x + tileSize - 4, waveY1);

    const waveY2 = y + tileSize * 0.7 + Math.cos(now + r * 2) * 2;
    ctx.moveTo(x + 4, waveY2);
    ctx.quadraticCurveTo(x + tileSize / 2, waveY2 - 4, x + tileSize - 4, waveY2);
    ctx.stroke();

    // Edge water foam
    ctx.fillStyle = 'rgba(224, 242, 254, 0.2)';
    ctx.fillRect(x, y, tileSize, 2);
    ctx.fillRect(x, y + tileSize - 2, tileSize, 2);
  } else if (tileType === 'BRIDGE') {
    // Water background underneath
    const waterGrad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
    waterGrad.addColorStop(0, '#0284C7');
    waterGrad.addColorStop(1, '#0369A1');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(x, y, tileSize, tileSize);

    // Drop shadow under bridge
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(x + 2, y + 4, tileSize - 4, tileSize - 4);

    // 4 Wooden Planks
    const plankCount = 4;
    const plankH = (tileSize - 8) / plankCount;
    for (let p = 0; p < plankCount; p++) {
      const py = y + 4 + p * plankH;
      const plankGrad = ctx.createLinearGradient(x, py, x, py + plankH);
      plankGrad.addColorStop(0, '#92400E');
      plankGrad.addColorStop(0.5, '#B45309');
      plankGrad.addColorStop(1, '#78350F');
      ctx.fillStyle = plankGrad;
      ctx.fillRect(x + 4, py + 1, tileSize - 8, Math.max(1, plankH - 2));

      // Plank Seam
      ctx.fillStyle = '#451A03';
      ctx.fillRect(x + 4, py + plankH - 1, tileSize - 8, 1);

      // Metallic Nails
      ctx.fillStyle = '#CBD5E1';
      ctx.beginPath();
      ctx.arc(x + 8, py + plankH / 2, 1.5, 0, Math.PI * 2);
      ctx.arc(x + tileSize - 8, py + plankH / 2, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Side Guard Rails
    ctx.fillStyle = '#78350F';
    ctx.fillRect(x + 2, y + 2, 4, tileSize - 4);
    ctx.fillRect(x + tileSize - 6, y + 2, 4, tileSize - 4);
    ctx.fillStyle = '#451A03';
    ctx.fillRect(x + 3, y + 2, 2, tileSize - 4);
    ctx.fillRect(x + tileSize - 5, y + 2, 2, tileSize - 4);

    // Rail Corner Posts
    ctx.fillStyle = '#B45309';
    ctx.fillRect(x + 1, y + 2, 6, 6);
    ctx.fillRect(x + 1, y + tileSize - 8, 6, 6);
    ctx.fillRect(x + tileSize - 7, y + 2, 6, 6);
    ctx.fillRect(x + tileSize - 7, y + tileSize - 8, 6, 6);
  } else if (tileType === 'ICE') {
    // Slick Frozen Ice
    const iceGrad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
    iceGrad.addColorStop(0, '#06B6D4');
    iceGrad.addColorStop(1, '#0891B2');
    ctx.fillStyle = iceGrad;
    ctx.fillRect(x, y, tileSize, tileSize);

    // Ice sheen highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.beginPath();
    ctx.moveTo(x + tileSize * 0.2, y);
    ctx.lineTo(x + tileSize * 0.8, y);
    ctx.lineTo(x + tileSize, y + tileSize * 0.2);
    ctx.lineTo(x + tileSize * 0.4, y + tileSize);
    ctx.closePath();
    ctx.fill();

    // Ice cracks
    ctx.strokeStyle = 'rgba(236, 254, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + tileSize * 0.3, y + tileSize * 0.3);
    ctx.lineTo(x + tileSize * 0.5, y + tileSize * 0.4);
    ctx.lineTo(x + tileSize * 0.7, y + tileSize * 0.35);
    ctx.stroke();
  } else {
    // Sci-Fi Grass / Ground Grid
    const isEven = (r + c) % 2 === 0;
    const bgGrad = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
    if (isEven) {
      bgGrad.addColorStop(0, '#1E293B');
      bgGrad.addColorStop(1, '#111827');
    } else {
      bgGrad.addColorStop(0, '#0F172A');
      bgGrad.addColorStop(1, '#0B132B');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(x, y, tileSize, tileSize);

    // Cell Border
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1);

    // Micro grass tufts
    if ((r * 13 + c * 31) % 5 === 0) {
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 1.5;
      const gx = x + tileSize * 0.7;
      const gy = y + tileSize * 0.7;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx - 3, gy - 6);
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx + 3, gy - 7);
      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawGoalFlag(ctx: CanvasRenderingContext2D, x: number, y: number, tileSize: number) {
  ctx.save();
  const cx = x + tileSize / 2;
  const cy = y + tileSize / 2;

  // Golden Goal Portal Radial Aura
  const pulse = (Math.sin(Date.now() / 300) + 1) / 2;
  const baseRadius = tileSize * 0.38;
  const goalGrad = ctx.createRadialGradient(cx, cy, Math.max(1, baseRadius * 0.2), cx, cy, baseRadius);
  goalGrad.addColorStop(0, `rgba(245, 158, 11, ${0.4 + pulse * 0.2})`);
  goalGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = goalGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius * 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Concentric Ring
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius * 0.75, 0, Math.PI * 2);
  ctx.stroke();

  // Flag Pole Position
  const poleX = cx - tileSize * 0.15;
  const poleYTop = cy - tileSize * 0.38;
  const poleYBot = cy + tileSize * 0.28;

  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(poleX, poleYBot - 2, tileSize * 0.3, 4);

  // Metallic Pole
  const poleGrad = ctx.createLinearGradient(poleX, poleYTop, poleX + 4, poleYTop);
  poleGrad.addColorStop(0, '#E2E8F0');
  poleGrad.addColorStop(0.5, '#94A3B8');
  poleGrad.addColorStop(1, '#475569');
  ctx.fillStyle = poleGrad;
  ctx.fillRect(poleX - 2, poleYTop, 4, poleYBot - poleYTop);

  // Waving Banner Flag
  const flagW = tileSize * 0.42;
  const flagH = tileSize * 0.28;
  const wave = Math.sin(Date.now() / 250) * 3;

  const flagGrad = ctx.createLinearGradient(poleX, poleYTop, poleX + flagW, poleYTop);
  flagGrad.addColorStop(0, '#EF4444');
  flagGrad.addColorStop(0.5, '#F87171');
  flagGrad.addColorStop(1, '#DC2626');

  ctx.fillStyle = flagGrad;
  ctx.beginPath();
  ctx.moveTo(poleX, poleYTop);
  ctx.quadraticCurveTo(poleX + flagW * 0.5, poleYTop + wave, poleX + flagW, poleYTop + wave / 2);
  ctx.lineTo(poleX + flagW, poleYTop + flagH + wave / 2);
  ctx.quadraticCurveTo(poleX + flagW * 0.5, poleYTop + flagH + wave, poleX, poleYTop + flagH);
  ctx.closePath();
  ctx.fill();

  // Golden Flag Outline Trim
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Star Emblem on Flag
  ctx.fillStyle = '#FEF08A';
  ctx.beginPath();
  ctx.arc(poleX + flagW * 0.4, poleYTop + flagH * 0.5 + wave / 2, Math.max(1, tileSize * 0.05), 0, Math.PI * 2);
  ctx.fill();

  // Top Golden Sphere Ornament
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(poleX, poleYTop, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FEF08A';
  ctx.beginPath();
  ctx.arc(poleX - 1, poleYTop - 1, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawItem(ctx: CanvasRenderingContext2D, item: LevelItem, cx: number, cy: number, tileSize: number) {
  if (item.collected) return;
  ctx.save();

  // Gentle floating animation
  const bounceY = cy + Math.sin(Date.now() / 300 + item.x * 2) * 3;

  if (item.type === 'SHEEP') {
    // 🐑 CUTE FLUFFY SHEEP
    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + tileSize * 0.25, Math.max(1, tileSize * 0.26), Math.max(1, tileSize * 0.1), 0, 0, Math.PI * 2);
    ctx.fill();

    // 4 Tiny Legs
    ctx.fillStyle = '#1E293B';
    const legY = bounceY + tileSize * 0.12;
    const legW = Math.max(2, tileSize * 0.05);
    const legH = tileSize * 0.14;
    ctx.fillRect(cx - tileSize * 0.16, legY, legW, legH);
    ctx.fillRect(cx - tileSize * 0.06, legY, legW, legH);
    ctx.fillRect(cx + tileSize * 0.02, legY, legW, legH);
    ctx.fillRect(cx + tileSize * 0.12, legY, legW, legH);

    // Fluffy Cloud Body
    const woolColor = '#F8FAFC';
    const woolShadow = '#CBD5E1';
    const bodyR = tileSize * 0.18;

    // Body shadow puffs
    ctx.fillStyle = woolShadow;
    ctx.beginPath();
    ctx.arc(cx - bodyR * 0.6, bounceY + 2, Math.max(1, bodyR * 0.9), 0, Math.PI * 2);
    ctx.arc(cx + bodyR * 0.6, bounceY + 2, Math.max(1, bodyR * 0.9), 0, Math.PI * 2);
    ctx.arc(cx, bounceY + bodyR * 0.5, Math.max(1, bodyR * 0.9), 0, Math.PI * 2);
    ctx.fill();

    // Main Body White Puffs
    ctx.fillStyle = woolColor;
    ctx.beginPath();
    ctx.arc(cx - bodyR * 0.7, bounceY - 1, Math.max(1, bodyR * 0.85), 0, Math.PI * 2);
    ctx.arc(cx + bodyR * 0.7, bounceY - 1, Math.max(1, bodyR * 0.85), 0, Math.PI * 2);
    ctx.arc(cx, bounceY - bodyR * 0.6, Math.max(1, bodyR * 0.95), 0, Math.PI * 2);
    ctx.arc(cx - bodyR * 0.3, bounceY + 1, Math.max(1, bodyR * 0.8), 0, Math.PI * 2);
    ctx.arc(cx + bodyR * 0.3, bounceY + 1, Math.max(1, bodyR * 0.8), 0, Math.PI * 2);
    ctx.fill();

    // Sheep Head (Dark Charcoal)
    const headX = cx + tileSize * 0.14;
    const headY = bounceY - tileSize * 0.02;
    const headR = tileSize * 0.14;

    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(headX, headY, Math.max(1, headR), 0, Math.PI * 2);
    ctx.fill();

    // Drooping Ear
    ctx.beginPath();
    ctx.ellipse(headX + 2, headY - headR * 0.4, Math.max(1, headR * 0.4), Math.max(1, headR * 0.8), Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Fluffy Toupee Wool on Head
    ctx.fillStyle = woolColor;
    ctx.beginPath();
    ctx.arc(headX - 2, headY - headR * 0.7, Math.max(1, headR * 0.5), 0, Math.PI * 2);
    ctx.arc(headX + 3, headY - headR * 0.7, Math.max(1, headR * 0.4), 0, Math.PI * 2);
    ctx.fill();

    // Cute Shiny Eye
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(headX + headR * 0.3, headY - headR * 0.1, Math.max(1, headR * 0.28), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0F172A';
    ctx.beginPath();
    ctx.arc(headX + headR * 0.35, headY - headR * 0.1, Math.max(1, headR * 0.14), 0, Math.PI * 2);
    ctx.fill();

    // Eye Glint
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(headX + headR * 0.4, headY - headR * 0.2, Math.max(1, headR * 0.07), 0, Math.PI * 2);
    ctx.fill();

    // Pink Nose
    ctx.fillStyle = '#F472B6';
    ctx.beginPath();
    ctx.arc(headX + headR * 0.6, headY + headR * 0.2, Math.max(1, headR * 0.1), 0, Math.PI * 2);
    ctx.fill();

  } else if (item.type === 'CRYSTAL') {
    // 💎 FACETED EMERALD CRYSTAL
    // Ground Green Aura
    const auraR = tileSize * 0.35;
    const auraGrad = ctx.createRadialGradient(cx, cy + 4, Math.max(1, auraR * 0.1), cx, cy + 4, Math.max(1, auraR));
    auraGrad.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
    auraGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(cx, cy + 4, Math.max(1, auraR), 0, Math.PI * 2);
    ctx.fill();

    // 3D Gemstone Geometry
    const w = tileSize * 0.22;
    const h = tileSize * 0.32;
    const topY = bounceY - h;
    const midY = bounceY - h * 0.2;
    const botY = bounceY + h * 0.6;

    // Top Facet
    ctx.fillStyle = '#A7F3D0';
    ctx.beginPath();
    ctx.moveTo(cx, topY);
    ctx.lineTo(cx + w * 0.6, topY + h * 0.3);
    ctx.lineTo(cx, midY);
    ctx.lineTo(cx - w * 0.6, topY + h * 0.3);
    ctx.closePath();
    ctx.fill();

    // Left Facet
    ctx.fillStyle = '#34D399';
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.6, topY + h * 0.3);
    ctx.lineTo(cx - w, midY);
    ctx.lineTo(cx, botY);
    ctx.lineTo(cx, midY);
    ctx.closePath();
    ctx.fill();

    // Front Right Facet
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.moveTo(cx + w * 0.6, topY + h * 0.3);
    ctx.lineTo(cx + w, midY);
    ctx.lineTo(cx, botY);
    ctx.lineTo(cx, midY);
    ctx.closePath();
    ctx.fill();

    // Back Shadow Facet
    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.moveTo(cx - w, midY);
    ctx.lineTo(cx - w * 0.6, topY + h * 0.3);
    ctx.lineTo(cx, topY);
    ctx.lineTo(cx + w * 0.6, topY + h * 0.3);
    ctx.lineTo(cx + w, midY);
    ctx.closePath();
    ctx.fill();

    // Glint Star Highlight
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(cx - w * 0.3, topY + h * 0.35, 2.5, 0, Math.PI * 2);
    ctx.fill();

  } else if (item.type === 'KEY') {
    // 🔑 GOLDEN KEY
    ctx.fillStyle = '#F59E0B';
    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(cx - tileSize * 0.1, bounceY, Math.max(1, tileSize * 0.1), 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillRect(cx - tileSize * 0.02, bounceY - 2, tileSize * 0.25, 4);
    ctx.fillRect(cx + tileSize * 0.15, bounceY, 4, 6);
    ctx.fillRect(cx + tileSize * 0.2, bounceY, 4, 4);
  } else if (item.type === 'STAR') {
    // ⭐ GOLDEN STAR
    ctx.fillStyle = '#F59E0B';
    ctx.strokeStyle = '#FEF08A';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    const rOuter = tileSize * 0.25;
    const rInner = tileSize * 0.1;
    for (let i = 0; i < 5; i++) {
      const angleOut = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const angleIn = angleOut + Math.PI / 5;
      const x1 = cx + Math.cos(angleOut) * rOuter;
      const y1 = bounceY + Math.sin(angleOut) * rOuter;
      const x2 = cx + Math.cos(angleIn) * rInner;
      const y2 = bounceY + Math.sin(angleIn) * rInner;
      if (i === 0) ctx.moveTo(x1, y1);
      else ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawRobotPlayer(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  tileSize: number,
  dir: Direction
) {
  ctx.save();

  const radius = tileSize * 0.34;
  if (radius <= 0) return;

  // 1. Ground Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(px, py + radius * 0.85, Math.max(1, radius * 0.9), Math.max(1, radius * 0.35), 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Thruster / Hover Energy Aura
  const pulse = (Math.sin(Date.now() / 200) + 1) / 2;
  const hoverGrad = ctx.createRadialGradient(px, py, Math.max(1, radius * 0.2), px, py, Math.max(1, radius * 1.3));
  hoverGrad.addColorStop(0, `rgba(56, 189, 248, ${0.5 + pulse * 0.2})`);
  hoverGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = hoverGrad;
  ctx.beginPath();
  ctx.arc(px, py, Math.max(1, radius * 1.3), 0, Math.PI * 2);
  ctx.fill();

  // 3. Side Wheel/Ear Caps
  ctx.fillStyle = '#1E293B';
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;

  // Left ear cap
  ctx.beginPath();
  ctx.arc(px - radius * 0.9, py, Math.max(1, radius * 0.25), 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Right ear cap
  ctx.beginPath();
  ctx.arc(px + radius * 0.9, py, Math.max(1, radius * 0.25), 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 4. Main Metallic Robot Head Body
  const bodyGrad = ctx.createRadialGradient(
    px - radius * 0.3,
    py - radius * 0.3,
    Math.max(1, radius * 0.1),
    px,
    py,
    Math.max(1, radius)
  );
  bodyGrad.addColorStop(0, '#60A5FA');
  bodyGrad.addColorStop(0.4, '#3B82F6');
  bodyGrad.addColorStop(1, '#1D4ED8');

  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.arc(px, py, Math.max(1, radius), 0, Math.PI * 2);
  ctx.fill();

  // Metallic Rim Stroke
  ctx.strokeStyle = '#93C5FD';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 5. Antenna Rod & Glowing Orb
  const antennaY = py - radius * 0.9;
  ctx.strokeStyle = '#64748B';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(px, py - radius * 0.6);
  ctx.lineTo(px, antennaY);
  ctx.stroke();

  // Glowing Orb on Tip
  const orbColor = dir === 'NORTH' ? '#F59E0B' : '#38BDF8';
  ctx.fillStyle = orbColor;
  ctx.beginPath();
  ctx.arc(px, antennaY - 3, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(px - 1, antennaY - 4, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // 6. Visor Screen & Directional Face Expression
  let visorX = px;
  let visorY = py;
  let visorW = radius * 1.2;
  let visorH = radius * 0.7;

  let eyeOffset1 = { x: -radius * 0.28, y: 0 };
  let eyeOffset2 = { x: radius * 0.28, y: 0 };

  if (dir === 'NORTH') {
    visorY -= radius * 0.3;
    visorW = radius * 0.9;
    visorH = radius * 0.4;
  } else if (dir === 'SOUTH') {
    visorY += radius * 0.05;
  } else if (dir === 'EAST') {
    visorX += radius * 0.2;
    eyeOffset1 = { x: -radius * 0.1, y: 0 };
    eyeOffset2 = { x: radius * 0.32, y: 0 };
  } else if (dir === 'WEST') {
    visorX -= radius * 0.2;
    eyeOffset1 = { x: -radius * 0.32, y: 0 };
    eyeOffset2 = { x: radius * 0.1, y: 0 };
  }

  // Draw Dark Glass Visor Screen
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  const vCorner = visorH * 0.4;
  const vx = visorX - visorW / 2;
  const vy = visorY - visorH / 2;

  if (ctx.roundRect) {
    ctx.roundRect(vx, vy, visorW, visorH, vCorner);
  } else {
    ctx.rect(vx, vy, visorW, visorH);
  }
  ctx.fill();

  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Draw Glowing Digital LED Eyes (only visible when not facing North)
  if (dir !== 'NORTH') {
    const eyeR = radius * 0.15;
    const eyeColor = '#38BDF8';

    // Left Eye
    ctx.fillStyle = eyeColor;
    ctx.beginPath();
    ctx.arc(visorX + eyeOffset1.x, visorY + eyeOffset1.y, Math.max(1, eyeR), 0, Math.PI * 2);
    ctx.fill();

    // Right Eye
    ctx.beginPath();
    ctx.arc(visorX + eyeOffset2.x, visorY + eyeOffset2.y, Math.max(1, eyeR), 0, Math.PI * 2);
    ctx.fill();

    // Eye Shine
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(visorX + eyeOffset1.x - 1, visorY + eyeOffset1.y - 1, Math.max(1, eyeR * 0.4), 0, Math.PI * 2);
    ctx.arc(visorX + eyeOffset2.x - 1, visorY + eyeOffset2.y - 1, Math.max(1, eyeR * 0.4), 0, Math.PI * 2);
    ctx.fill();
  }

  // 7. Chest LED Indicator
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(px, py + radius * 0.6, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    currentLevel,
    setCurrentBlockId,
    setExecutionState,
    setSuccess,
    addLog,
    recordLevelCompletion,
    setVictoryModalOpen
  } = useGameStore();

  // Internal Animated State
  const [playerPos, setPlayerPos] = useState<Position>({ ...currentLevel.startPos });
  const [playerDir, setPlayerDir] = useState<Direction>(currentLevel.startDirection);
  const [mapState, setMapState] = useState<TileType[][]>(currentLevel.map.map(r => [...r]));
  const [itemsState, setItemsState] = useState<LevelItem[]>(
    currentLevel.items ? currentLevel.items.map(i => ({ ...i, collected: false })) : []
  );

  // Animation Refs
  const animRef = useRef<number | null>(null);
  const stepIndexRef = useRef<number>(0);
  const actionsRef = useRef<ActionStep[]>([]);
  const isExecutingRef = useRef<boolean>(false);

  // Reset local state whenever level changes & trigger GSAP scenario transition
  useEffect(() => {
    setPlayerPos({ ...currentLevel.startPos });
    setPlayerDir(currentLevel.startDirection);
    setMapState(currentLevel.map.map(r => [...r]));
    setItemsState(currentLevel.items ? currentLevel.items.map(i => ({ ...i, collected: false })) : []);
    stepIndexRef.current = 0;
    actionsRef.current = [];
    isExecutingRef.current = false;
    if (animRef.current) cancelAnimationFrame(animRef.current);

    // Smooth GSAP Scenario Transition
    if (canvasRef.current) {
      gsap.fromTo(
        canvasRef.current,
        { opacity: 0.2, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
      );
    }
  }, [currentLevel.id]);

  // Main Canvas Render Function
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: gridW, height: gridH } = currentLevel.gridSize;
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    // Calculate tile size and centering offset
    const tileSize = Math.min((canvasW - 40) / gridW, (canvasH - 40) / gridH);
    if (tileSize <= 0 || canvasW <= 0 || canvasH <= 0) return;

    const offsetX = (canvasW - tileSize * gridW) / 2;
    const offsetY = (canvasH - tileSize * gridH) / 2;

    // Clear Background
    ctx.fillStyle = '#090D16'; // Dark Sci-Fi Canvas Background
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Draw Board Tiles
    for (let r = 0; r < gridH; r++) {
      for (let c = 0; c < gridW; c++) {
        const x = offsetX + c * tileSize;
        const y = offsetY + r * tileSize;
        const tileType = mapState[r] ? mapState[r][c] : 'EMPTY';

        drawTile(ctx, tileType, x, y, tileSize, r, c);

        // Draw Goal Flag Zone
        if (currentLevel.goalPos.x === c && currentLevel.goalPos.y === r) {
          drawGoalFlag(ctx, x, y, tileSize);
        }
      }
    }

    // Draw Collectible Items
    itemsState.forEach(item => {
      const cx = offsetX + item.x * tileSize + tileSize / 2;
      const cy = offsetY + item.y * tileSize + tileSize / 2;
      drawItem(ctx, item, cx, cy, tileSize);
    });

    // Draw Player Robot (Cody) 🤖
    const px = offsetX + playerPos.x * tileSize + tileSize / 2;
    const py = offsetY + playerPos.y * tileSize + tileSize / 2;
    drawRobotPlayer(ctx, px, py, tileSize, playerDir);
  };

  // Canvas Resize Listener
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
        renderCanvas();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerRef, currentLevel, playerPos, playerDir, mapState, itemsState]);

  // Re-render canvas when animated state updates
  useEffect(() => {
    renderCanvas();
  }, [playerPos, playerDir, mapState, itemsState]);

  // Trigger Action Execution Animation Loop
  const triggerActionQueue = (actions: ActionStep[], totalBlocks: number) => {
    actionsRef.current = actions;
    stepIndexRef.current = 0;
    isExecutingRef.current = true;
    setExecutionState('RUNNING');

    const executeNextStep = () => {
      if (stepIndexRef.current >= actionsRef.current.length) {
        // Completed all actions successfully
        isExecutingRef.current = false;
        setExecutionState('SUCCESS');
        setCurrentBlockId(null);
        
        // Stars calculation
        let stars = 1;
        if (totalBlocks <= currentLevel.maxBlocks) {
          stars = 3;
        } else if (totalBlocks <= currentLevel.maxBlocks + 2) {
          stars = 2;
        }

        recordLevelCompletion(currentLevel.id, stars, totalBlocks);
        setSuccess("¡Excelente trabajo! Has completado el nivel con éxito.");

        // Confetti celebration
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        setTimeout(() => {
          setVictoryModalOpen(true);
        }, 600);
        return;
      }

      const step = actionsRef.current[stepIndexRef.current];
      setCurrentBlockId(step.blockId);
      setPlayerPos({ ...step.toPos });
      setPlayerDir(step.direction);
      setMapState(step.mapState.map(r => [...r]));
      setItemsState(step.itemsState.map(i => ({ ...i })));

      if (step.logMsg) {
        addLog(step.logMsg);
      }

      stepIndexRef.current++;

      // Speed delay
      const currentSpeed = useGameStore.getState().speed;
      const delayMs = 600 / currentSpeed;

      setTimeout(() => {
        if (useGameStore.getState().executionState === 'RUNNING') {
          executeNextStep();
        }
      }, delayMs);
    };

    executeNextStep();
  };

  // Expose step execution globally via custom window dispatcher for controls
  useEffect(() => {
    (window as any).__runActionQueue = triggerActionQueue;
  }, [currentLevel]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[350px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Mission Checklist Overlay */}
      <MissionChecklist />
    </div>
  );
};
