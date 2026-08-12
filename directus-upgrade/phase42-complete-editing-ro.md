# Editare vizuală completă — instalare

Această versiune adaugă în Directus colecția `page_elements` și conectează la Visual Editor conținutul vizibil din:

- pagina principală;
- meniul și submeniul de servicii;
- pagina generală „Servicii”;
- toate cele șase pagini individuale de servicii;
- secțiunile de proces, statistici, instrumente și portofoliu;
- formularul de contact, footer și popup-ul promoțional;
- versiunile în spaniolă și engleză.

Aspectul paginii, animațiile și structura rămân protejate pentru a nu putea fi stricate accidental.

## 1. Publică proiectul

Încarcă această versiune în GitHub și pornește un deploy nou în EasyPanel.

## 2. Creează automat câmpurile în Directus

În serviciul web din EasyPanel verifică variabilele:

```txt
DIRECTUS_URL=https://admin.d-solution.org
DIRECTUS_TOKEN=un_token_cu_drepturi_de_administrator
```

Deschide consola serviciului web și execută o singură dată:

```txt
npm run directus:complete-editing
```

Scriptul este sigur la reluare: nu șterge și nu suprascrie conținutul existent. Creează numai colecția, câmpurile și elementele care lipsesc.

La final trebuie să apară mesajul că `page_elements` este pregătită pentru editare vizuală.

## 3. Permite site-ului să citească noile elemente

Alege una dintre variante:

1. Recomandat: păstrează în serviciul web un `DIRECTUS_TOKEN` doar cu permisiune de citire pentru colecțiile publice, inclusiv `page_elements`.
2. Sau, în Directus, mergi la **Settings → Access Control → Public** și acordă `Read` pentru `page_elements`, numai pentru elementele cu `is_published = true`.

Nu păstra permanent în site un token de administrator. După inițializare, înlocuiește-l cu un token doar pentru citire și redeployează.

## 4. Folosește Visual Editor

URL-ul site-ului din Visual Editor trebuie să fie:

```txt
https://d-solution.org/?visual-editing=true
```

Reîncarcă Visual Editor, activează creionul și dă clic pe textul sau imaginea dorită. Elementele noi se găsesc și manual în colecția **Page Elements**, grupate prin câmpurile `page`, `locale` și `section`.

După salvare, previzualizarea se actualizează. Dacă o modificare nu apare imediat, reîncarcă cadrul de previzualizare și verifică limba selectată, `es` sau `en`.

## Notă despre „complet editabil”

Este editabil conținutul: texte, titluri, etichete, butoane, linkuri, imagini și culorile instrumentelor pentru care există câmp. Poziția elementelor, dimensiunile, fonturile, efectele și structura paginii rămân în cod. Aceasta previne deteriorarea designului din greșeală.
