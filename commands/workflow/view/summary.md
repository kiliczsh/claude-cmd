---
allowed-tools: Read, Bash(jq:*), Bash(gdate:*), Bash(wc:*)
name: "Summary"
description: "Generate structured conversation summary with key decisions, action items, and essential code snippets"
author: "wcygan"
tags: ["workflow","view"]
version: "1.0.0"
created_at: "2025-07-14T00:00:00Z"
updated_at: "2025-07-14T00:00:00Z"
---

## Context

- Session ID: !`gdate +%s%N 2>/dev/null || date +%s%N 2>/dev/null || echo "$(date +%s)$(jot -r 1 100000 999999 2>/dev/null || shuf -i 100000-999999 -n 1 2>/dev/null || echo $RANDOM$RANDOM)"`
- Conversation length: !`echo "Calculating conversation size..." | wc -c || echo "unknown"`
- Target format: Structured business summary with actionable insights

## Your Task

STEP 1: Analyze conversation scope and content depth

- REVIEW the entire conversation context systematically
- IDENTIFY key themes, decisions, and technical discussions
- CATEGORIZE content by importance and actionability
- EXTRACT essential code/configuration examples

STEP 2: Generate structured summary following exact deliverable format

**Deliverable Structure (MANDATORY):**

### TLDR

• 2-3 sentence high-level recap (≤50 words)

### Bullet Points

• Key decisions
• Action items with responsible parties
• Open questions / blockers
• Next steps
(Limit to 8 bullets total)

### Code Snippets

IF conversation included code, config, or CLI commands essential for reproducing solutions:

- INCLUDE in fenced blocks
- OMIT boilerplate and unnecessary details
- FOCUS on reproduction-critical elements

STEP 3: Apply content quality controls

**Mandatory Rules:**

- USE only information present in conversation context; NEVER invent content
- PRESERVE original terminology, variable names, and paths exactly
- WRITE in crisp business English; AVOID filler words
- ENSURE entire summary (excluding code blocks) ≤300 words
- FOCUS on actionable insights and concrete next steps

STEP 4: Validate summary completeness

- VERIFY all critical decisions captured
- CONFIRM action items have clear ownership
- ENSURE blockers and next steps are specific
- CHECK code snippets are reproduction-ready