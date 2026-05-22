# NFCTron Case Study 

SPA aplikace pro rezervaci mist s autorizaci a vytvořením objednavky

## Stack 

- **React** + **Typescript** - UI
- **Effector** - state management
- **Tailwind** - stylizace
- **Radix UI** - ui komponenty (Popups, Dialog atd)

## Structure 

| / | Vysvetleni |
| :---: | --- |
| /api | vyzvy k serveru a jejich typy |
| /model | uložiště dat a jich zpracování |
| /ui | radix components |
| /lib | externi nastroje jako jsou className props |
| /components | jednotilvé časti UI |

## Features
 
### Seat Map

- Zobrazeni tabulky míst pomocí API
- Doplnění míst, která chybí / jsou již obsazena
- Přidat / odstranit z koše

### Checkout 

- Možnost přihlašení jako host
- Multistep ověření a platba
    1. Options (Login or Guest)
    2. Login form
    3. Guest form
    4. Payment confirmation (bez zbytečnych funkci, jenom tlačitko paz)
    5. Payment confirmation (zobrazuje informace o useru pomoci odpovědi z API)