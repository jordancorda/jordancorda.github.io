from pathlib import Path
from zipfile import ZipFile
from copy import copy
from io import BytesIO
import fitz

BASE = Path('.')
BIO = {
'it': [
"Jordan Corda, vibrafonista e compositore jazz nato a Cagliari nel 1994, si è formato nei Conservatori di Cagliari, Milano e Pescara, diplomandosi con il massimo dei voti e la lode in vibrafono jazz.",
"Nel corso della sua carriera ha collaborato con numerosi musicisti della scena jazz nazionale e internazionale, tra cui Luca Mannutza, Max Ionata, Sasha Mashin, Makar Novikov, Paolo Recchia, Tony Pancella e l’Oleksandr Kolosi 5et, con Doug Weiss e Remy Le Boeuf.",
"Si è esibito in importanti festival e jazz club in Italia e all’estero, tra cui JazzMi, European Jazz Expo, Time in Jazz, Blue Note Milano, Johnny Raducanu Jazz Festival in Romania, Sarabski Music Festival in Azerbaigian e Center for Dansk Jazzhistorie in Danimarca. Ha inoltre collaborato con diverse orchestre jazz, tra cui la Sardegna Jazz Orchestra, la Verdi Jazz Orchestra, l’AreaM Jazz Orchestra e la ONJ.",
"Nel 2026 pubblica Awakenings (A.MA Records), il suo primo album da leader, composto interamente da brani originali e accolto positivamente dalla critica italiana e internazionale.",
"Vincitore del premio internazionale Johnny Răducanu con il suo trio, del Premio del Pubblico al concorso Chicco Bettinardi e del Premio Isio Saba, nel 2019 è stato invitato alla Notte dei Vibrafoni – Omaggio a Milt Jackson, insieme ad Andrea Dulbecco, David Friedman e Tony Miceli."
],
'en': [
"Jordan Corda, a jazz vibraphonist and composer born in Cagliari in 1994, studied at the conservatories of Cagliari, Milan and Pescara, graduating in jazz vibraphone with highest honors.",
"Throughout his career, he has collaborated with numerous musicians from the Italian and international jazz scenes, including Luca Mannutza, Max Ionata, Sasha Mashin, Makar Novikov, Paolo Recchia, Tony Pancella and the Oleksandr Kolosi 5et, featuring Doug Weiss and Remy Le Boeuf.",
"He has performed at major festivals and jazz clubs in Italy and abroad, including JazzMi, European Jazz Expo, Time in Jazz, Blue Note Milano, the Johnny Raducanu Jazz Festival in Romania, the Sarabski Music Festival in Azerbaijan and the Center for Dansk Jazzhistorie in Denmark. He has also worked with several jazz orchestras, including the Sardegna Jazz Orchestra, Verdi Jazz Orchestra, AreaM Jazz Orchestra and ONJ.",
"In 2026, he released Awakenings (A.MA Records), his debut album as a leader, featuring entirely original compositions and receiving a positive response from critics in Italy and internationally.",
"With his trio, he won the international Johnny Răducanu Jazz Award; he has also received the Audience Award at the Chicco Bettinardi competition and the Isio Saba Award. In 2019, he was invited to perform at Notte dei Vibrafoni – Omaggio a Milt Jackson alongside Andrea Dulbecco, David Friedman and Tony Miceli."
]
}

def revise_pdf(data, lang):
    doc = fitz.open(stream=data, filetype='pdf')
    assert len(doc) == 5
    page = doc[2]
    assert ('Biografia e musica' if lang == 'it' else 'Biography & music') in page.get_text()
    font_path = '/usr/share/fonts/truetype/lato/Lato-Regular.ttf'
    font = fitz.Font(fontfile=font_path)
    fontsize = 10.05
    baseline = 146.0
    line_height = 13.5
    page.add_redact_annot(fitz.Rect(50,130,545,381), fill=(249/255,249/255,246/255))
    page.apply_redactions(images=0, graphics=0, text=0)
    page.insert_font(fontname='UpdatedBioFont', fontfile=font_path)
    for para in BIO[lang]:
        current = ''
        for word in para.split():
            candidate = (current + ' ' + word).strip()
            if current and font.text_length(candidate, fontsize=fontsize) > 492:
                page.insert_text(fitz.Point(51,baseline),current,fontname='UpdatedBioFont',fontsize=fontsize,color=(23/255,23/255,25/255))
                baseline += line_height
                current = word
            else:
                current = candidate
        if current:
            page.insert_text(fitz.Point(51,baseline),current,fontname='UpdatedBioFont',fontsize=fontsize,color=(23/255,23/255,25/255))
            baseline += line_height
        baseline += 10
    assert baseline <= 385, (lang, baseline)
    result = doc.tobytes(garbage=4,deflate=True)
    revised = fitz.open(stream=result,filetype='pdf')
    text = ' '.join(revised[2].get_text().split())
    assert all(p[:45] in text for p in BIO[lang]), 'Missing bio paragraph'
    assert ('12 BRANI' if lang=='it' else '12 TRACKS') in text
    return result

def revise_zip(lang):
    path=BASE / 'press' / f'awakenings-press-kit-{lang}.zip'
    pdfname=f'Awakenings_Press_Kit_{lang.upper()}.pdf'
    before=path.read_bytes()
    with ZipFile(BytesIO(before)) as zin:
        assert pdfname in zin.namelist()
        output=BytesIO()
        with ZipFile(output,'w') as zout:
            for info in zin.infolist():
                data=zin.read(info.filename)
                if info.filename == pdfname:
                    data=revise_pdf(data,lang)
                zout.writestr(copy(info),data)
        after=output.getvalue()
        with ZipFile(BytesIO(after)) as znew:
            assert zin.namelist()==znew.namelist()
            assert all(zin.read(n)==znew.read(n) for n in zin.namelist() if n!=pdfname)
    assert before != after
    path.write_bytes(after)
    print(f'{lang} press kit updated, {len(after)} bytes')

if __name__=='__main__':
    revise_zip('it')
    revise_zip('en')
