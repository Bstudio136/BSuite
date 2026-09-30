<h2 align="center">🌍 Choose your language / Choisissez votre langue</h2>

<p align="center">
  🇬🇧 <a href="#english">English</a> | 🇫🇷 <a href="#français">Français</a>
</p>

---

<a id="english"></a>

# 🇬🇧 English

# BSuite

> A **security toolkit** hidden behind a **fake calculator**.
> One HTML file, no build step, no server — everything runs locally.

---

## 🔗 Live Demo

| App | Link |
|-----|------|
| 🧮 **Fake Calculator** (locked entry point) | [**Open the calculator**](https://bstudio136.github.io/BSuite/) |
| 🚀 **BSuite Hub** (already unlocked) | [**Open BSuite directly**](https://bstudio136.github.io/BSuite/BSuite.html) |

> 💡 On the calculator, type **`01360`** then press `=` **three times** to reveal BSuite.

---

## 🎭 The Concept

BSuite looks like a **plain iOS-style calculator**. It actually works as a real calculator, but it hides a **cybersecurity hub** accessible via a **secret code**.

### 🔓 How to unlock BSuite

1. Open `index.html` in a browser.
2. Type the code **`01360`** on the keypad.
3. Press `=` **three times in a row**.
4. The **B SUITE** hub appears.

> 💡 Tip: the buffer is reset if you press another number or use an operator (`+`, `-`, `×`, `÷`).

---

## 📦 Repository Contents

| File | Purpose |
|------|---------|
| `index.html` | **Fake calculator** + hidden BSuite hub (all-in-one main file). |
| `BSuite.html` | The **BSuite hub alone**, without the calculator disguise (already unlocked). |
| `Sources/` | Favicon, `site.webmanifest`, PWA assets. |

---

## 🧰 The 5 Built-in Tools

All apps are **100% local** (no server request, except when explicitly noted).

### 🔐 B AUTH — TOTP / 2FA generator
- Generates **TOTP codes** (compatible with Google Authenticator, Authy, etc.).
- Manual import via **Base32** secret.
- Multi-account: tags, notes, pinning, drag-and-drop sorting.
- Compact mode, censor mode (hides codes), light/dark theme.
- **JSON** export / import to back up your vault.

### 🔑 B GEN PASS — Password generator & analyzer
- **Cryptographically secure** generation (Web Crypto API).
- Modes: **Password**, **Passphrase** (EFF wordlist), **Wi-Fi** (with QR Code).
- Analyzer: entropy, estimated crack time, weak patterns, criteria (A-Z, a-z, 0-9, symbols).
- **HIBP** (Have I Been Pwned) check via the `pwnedpasswords.com` API (k-anonymity — password never sent).
- Auto-clears clipboard after 30 s.

### 📝 B KEEP NOTES — Encrypted notes, vault, secret PINs
- Rich **note editor** (bold, italic, underline, colors).
- Folders, tags, trash, pinning, drag-and-drop.
- **Two private vaults** protected by **two distinct PINs** (see default codes below).
- Built-in **password vault** with generator.
- **AES-256-GCM** message encryption tool (PBKDF2 100,000 iterations).
- **IndexedDB** storage (no localStorage for sensitive data).
- Full **JSON** export / import.

### 🛡️ B PGP — Encryption & invisible facade
- **AES-256** encryption + **PBKDF2 with 263,000 iterations**.
- Format: `saltHex:cipher` (salt changes on every encryption).
- **Facade / invisible steganography**: a secret message is encoded as zero-width characters (U+200B / U+200C / U+200D) and embedded into a banal text (Resto, Football, Work, Weather, or custom text).
- **Panic button** that wipes all fields and clipboard.
- Light / dark theme (Tailwind).

### 🖼️ B STEGANO — Image steganography & EXIF cleaner
- **Encode** a secret message into the **LSB** (Least Significant Bits) of a PNG image.
- **Decode** a hidden message from an image.
- **Optional AES-GCM encryption** before encoding (PBKDF2 100,000 iterations).
- **MetaCleaner Pro**: full **EXIF** metadata readout, including **GPS location** (with Google Maps link).
- Metadata / GPS removal (JPEG re-encoding).
- Built-in end marker: `||BSTEGANO_END||` to avoid read errors.

---

## 🔢 Default PIN Codes (B Keep Notes)

| Field | Default value |
|-------|---------------|
| **Main PIN** | `1234` |
| **Hidden PIN (2nd vault)** | `6789` |

⚠️ **Change them immediately** via the sidebar → *Change PIN codes*.

The hidden PIN opens a **completely separate second private notes vault** (useful under duress).

---

## 🚀 Usage

### 1. Local
```bash
git clone https://github.com/Bstudio136/BSuite.git
cd BSuite
```
Open `index.html` in your browser.

### 2. Via GitHub Pages
Enable **GitHub Pages** on the `main` branch and open the generated URL. You'll land on the calculator: type `01360` then `=` ×3.

### 3. Static hosting
Works out of the box on Netlify, Vercel, Cloudflare Pages, a simple Nginx/Apache server, or even via `file://` (local mode).

---

## 🛠️ Technical Structure

```
BSuite/
├── index.html          # Fake calculator + embedded BSuite (all-in-one)
├── BSuite.html         # BSuite hub alone, without the calculator
└── Sources/
    ├── icon-ios.png
    └── site.webmanifest
```

Each BSuite "app" is stored in a `<template>` inside the main file. On click, it's injected into an `<iframe>` via a `Blob` URL — isolating its JS and CSS from the rest of the page.

### Technologies used
- **HTML / CSS / Vanilla JavaScript** (no framework, no build).
- **Web Crypto API** (`crypto.subtle`) for AES-GCM, PBKDF2, SHA-1, random generation.
- **OTPAuth** (CDN) for TOTP codes.
- **QRious** (CDN) for Wi-Fi QR codes.
- **CryptoJS** (CDN) for B PGP.
- **Tailwind CDN** + **Lucide Icons** for B PGP.
- **IndexedDB** (B Keep Notes) and **localStorage** (others).

---

## 🔒 Security & Privacy

- ✅ Everything runs **client-side**: no data is ever sent to a server.
- ✅ Passwords and messages are encrypted with **AES-256-GCM** using **random salt and IV**.
- ✅ Clipboard is auto-cleared in B Gen Pass (30 s).
- ⚠️ **This is not an audited password manager**. Use with awareness, JSON backups recommended.
- ⚠️ The "calculator" facade is **security by obscurity**: it won't protect against someone inspecting the source code.

---

## 🧪 Quick Unlock Test

```
Sequence:  0 1 3 6 0  =  =  =
Result:    → B SUITE
```

---

## 📄 License — All Rights Reserved

**Copyright © 2026 Bstudio136. All rights reserved.**

This project and all its source code, files, assets, and documentation are **strictly proprietary**.

**You are NOT allowed to:**
- ❌ Copy, reproduce, or duplicate any part of this project.
- ❌ Modify, adapt, translate, or create derivative works.
- ❌ Distribute, publish, sublicense, sell, rent, or lease any part of it.
- ❌ Use it (in whole or in part) in any commercial or non-commercial product.
- ❌ Claim authorship or remove/alter copyright notices.

**You are ONLY allowed to:**
- ✅ View this repository on GitHub for personal, informational purposes.

Any unauthorized use is strictly prohibited and may result in legal action.

For any request (commercial use, partnership, etc.), **contact the author** at the GitHub profile: [@Bstudio136](https://github.com/Bstudio136).

---

## 📬 Contact

- GitHub Issues: [github.com/Bstudio136/BSuite/issues](https://github.com/Bstudio136/BSuite/issues)

---

*Last updated: September 30, 2026*

<br>

<p align="center"><a href="#english">⬆️ Back to top</a> · <a href="#français">🇫🇷 Passer au français</a></p>

---
---

<a id="français"></a>

# 🇫🇷 Français

# BSuite

> Une **suite d'outils de sécurité** entièrement locale, cachée derrière une **calculatrice factice**.
> Un seul fichier HTML, aucune dépendance de build, aucune donnée envoyée sur un serveur.

---

## 🔗 Démo en ligne

| Application | Lien |
|-------------|------|
| 🧮 **Calculatrice factice** (point d'entrée verrouillé) | [**Ouvrir la calculatrice**](https://bstudio136.github.io/BSuite/) |
| 🚀 **Hub BSuite** (déjà déverrouillé) | [**Ouvrir BSuite directement**](https://bstudio136.github.io/BSuite/BSuite.html) |

> 💡 Sur la calculatrice, tapez **`01360`** puis appuyez **3 fois** sur `=` pour révéler BSuite.

---

## 🎭 Le concept

BSuite se présente comme une **calculatrice banale** (façon iOS). Elle fonctionne réellement comme une calculatrice, mais elle cache un **hub d'outils de cybersécurité** accessible via un **code secret**.

### 🔓 Comment déverrouiller BSuite ?

1. Ouvrez le fichier `index.html` dans un navigateur.
2. Tapez le code **`01360`** sur le clavier de la calculatrice.
3. Appuyez **3 fois de suite** sur `=`.
4. Le hub **B SUITE** apparaît.

> 💡 Astuce : le buffer est réinitialisé si vous tapez un autre chiffre ou utilisez un opérateur (`+`, `-`, `×`, `÷`).

---

## 📦 Contenu du dépôt

| Fichier | Rôle |
|--------|------|
| `index.html` | **Calculatrice factice** + hub BSuite caché (fichier principal tout-en-un). |
| `BSuite.html` | Le **hub BSuite seul**, sans la façade calculatrice (déjà déverrouillé). |
| `Sources/` | Favicon, `site.webmanifest`, ressources PWA. |

---

## 🧰 Les 5 outils intégrés

Toutes les applications sont **100 % locales** (aucune requête serveur sauf lorsque explicitement indiqué).

### 🔐 B AUTH — Générateur TOTP / 2FA
- Génération de codes **TOTP** (compatibles Google Authenticator, Authy, etc.).
- Import manuel via clé **Base32**.
- Gestion multi-comptes : tags, notes, épinglage, tri par glisser-déposer.
- Mode compact, mode censuré (masque les codes), thème clair/sombre.
- Export / import **JSON** pour sauvegarder votre coffre.

### 🔑 B GEN PASS — Générateur & analyseur de mots de passe
- Génération **cryptographiquement sûre** (Web Crypto API).
- Modes : **Mot de passe**, **Passphrase** (liste EFF), **Wi-Fi** (avec QR Code).
- Analyseur : entropie, temps de craquage estimé, motifs faibles, critères (A-Z, a-z, 0-9, symboles).
- Vérification **HIBP** (Have I Been Pwned) via l'API `pwnedpasswords.com` (k-anonymat, le mot de passe n'est jamais envoyé).
- Effacement auto du presse-papiers après 30 s.

### 📝 B KEEP NOTES — Notes chiffrées, coffre-fort, PIN secrets
- Éditeur de notes **riche** (gras, italique, souligné, couleurs).
- Dossiers, tags, corbeille, épinglage, glisser-déposer.
- **Deux coffres privés** protégés par **deux PIN distincts** (voir codes par défaut plus bas).
- **Coffre de mots de passe** intégré avec générateur.
- Outil de **chiffrement AES-256-GCM** de messages (PBKDF2 100 000 itérations).
- Stockage **IndexedDB** (pas de localStorage pour les données sensibles).
- Export / import complet **JSON**.

### 🛡️ B PGP — Chiffrement & façade invisible
- Chiffrement **AES-256** + dérivation **PBKDF2 à 263 000 itérations**.
- Format : `selHex:cipher` (le sel change à chaque chiffrement).
- **Façade / stéganographie par caractères invisibles** : un message secret est encodé dans des zéro-width characters (U+200B / U+200C / U+200D) et collé dans un texte banal (Resto, Foot, Travail, Météo, ou texte personnalisé).
- Bouton **Purge rapide** (panic button) qui vide tous les champs et le presse-papiers.
- Thème clair / sombre (Tailwind).

### 🖼️ B STEGANO — Stéganographie d'images & nettoyage EXIF
- **Encode** un message secret dans les **LSB** (Least Significant Bits) d'une image PNG.
- **Décode** un message caché depuis une image.
- **Chiffrement AES-GCM optionnel** avant l'encodage (PBKDF2 100 000 itérations).
- **MetaCleaner Pro** : lecture et affichage complet des métadonnées **EXIF**, y compris la **position GPS** (avec lien Google Maps).
- Suppression des métadonnées / GPS (réencodage JPEG).
- Marqueur de fin intégré : `||BSTEGANO_END||` pour éviter les erreurs de lecture.

---

## 🔢 Codes PIN par défaut (B Keep Notes)

| Champ | Valeur par défaut |
|-------|-------------------|
| **PIN principal** | `1234` |
| **PIN caché (2ᵉ coffre)** | `6789` |

⚠️ **Changez-les immédiatement** via le menu latéral → *Changer les codes PIN*.

Le PIN caché ouvre un **second coffre de notes privées complètement séparé** (utile en cas de contrainte).

---

## 🚀 Utilisation

### 1. En local
```bash
git clone https://github.com/Bstudio136/BSuite.git
cd BSuite
```
Ouvrez `index.html` dans votre navigateur.

### 2. Via GitHub Pages
Activez **GitHub Pages** sur la branche `main` et ouvrez l'URL générée. Vous tomberez sur la calculatrice : tapez `01360` puis `=` ×3.

### 3. Hébergement statique
Fonctionne tel quel sur Netlify, Vercel, Cloudflare Pages, un simple serveur Nginx/Apache, ou même en `file://` (mode local).

---

## 🛠️ Structure technique

```
BSuite/
├── index.html          # Calculatrice factice + BSuite embarqué (tout-en-un)
├── BSuite.html         # Hub BSuite seul, sans calculatrice
└── Sources/
    ├── icon-ios.png
    └── site.webmanifest
```

Chaque « app » de BSuite est stockée dans un `<template>` du fichier principal. Au clic, elle est injectée dans un `<iframe>` via un `Blob` URL — ce qui isole son JS et son CSS du reste de la page.

### Technologies utilisées
- **HTML / CSS / JavaScript vanilla** (aucun framework, aucun build).
- **Web Crypto API** (`crypto.subtle`) pour AES-GCM, PBKDF2, SHA-1, génération aléatoire.
- **OTPAuth** (CDN) pour les codes TOTP.
- **QRious** (CDN) pour les QR codes Wi-Fi.
- **CryptoJS** (CDN) pour B PGP.
- **Tailwind CDN** + **Lucide Icons** pour B PGP.
- **IndexedDB** (B Keep Notes) et **localStorage** (les autres).

---

## 🔒 Sécurité & confidentialité

- ✅ Tout est **exécuté côté client** : aucune donnée n'est envoyée à un serveur.
- ✅ Les mots de passe et messages sont chiffrés en **AES-256-GCM** avec **sel et IV aléatoires**.
- ✅ Le presse-papiers est vidé automatiquement dans B Gen Pass (30 s).
- ⚠️ **Ce n'est pas un gestionnaire de mots de passe audité**. À utiliser en connaissance de cause, sauvegardes JSON recommandées.
- ⚠️ La façade « calculatrice » relève de la **sécurité par obscurité** : elle ne protège pas contre quelqu'un qui inspecte le code source.

---

## 🧪 Vérification rapide du déverrouillage

```
Séquence :  0 1 3 6 0  =  =  =
Résultat :  → B SUITE
```

---

## 📄 Licence — Tous droits réservés

**Copyright © 2026 Bstudio136. Tous droits réservés.**

Ce projet ainsi que l'intégralité de son code source, de ses fichiers, de ses ressources et de sa documentation sont **strictement propriétaires**.

**Il est formellement interdit de :**
- ❌ Copier, reproduire ou dupliquer toute partie de ce projet.
- ❌ Modifier, adapter, traduire ou créer des œuvres dérivées.
- ❌ Distribuer, publier, sous-licencier, vendre, louer ou prêter toute partie de ce projet.
- ❌ Utiliser ce projet (en tout ou en partie) dans un produit commercial ou non commercial.
- ❌ Revendiquer la paternité ou supprimer/modifier les mentions de copyright.

**Vous êtes uniquement autorisé à :**
- ✅ Consulter ce dépôt sur GitHub à des fins personnelles et informatives.

Toute utilisation non autorisée est strictement interdite et pourra faire l'objet de poursuites.

Pour toute demande (usage commercial, partenariat, etc.), **contactez l'auteur** sur son profil GitHub : [@Bstudio136](https://github.com/Bstudio136).

---

## 📬 Contact

- Issues GitHub : [github.com/Bstudio136/BSuite/issues](https://github.com/Bstudio136/BSuite/issues)

---

*Dernière mise à jour : 30 septembre 2026*

<br>

<p align="center"><a href="#français">⬆️ Haut de page</a> · <a href="#english">🇬🇧 Switch to English</a></p>
