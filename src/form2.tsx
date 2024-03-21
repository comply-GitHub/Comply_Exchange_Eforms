
// import React, { useEffect } from 'react';
// import { pdf , Font,Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// type FormProps = {
//   onGeneratePDF: (url: string) => void;
// };

// var data = localStorage.getItem("agentDetails"); // data may be a string or null

// if (data !== null) {
//   try {
//     var parsedData = JSON.parse(data);

//     if (typeof parsedData === 'object') {
//       console.log("Priyu",parsedData);
//     } else {
//       console.error("Data in localStorage is not a valid JavaScript object.");
//     }
//   } catch (error) {
//     console.error("Error parsing data from localStorage:", error);
//   }
// } else {
//   console.error("No data with the key 'agentDetails' found in localStorage.");
// }

// const dynamicData = {
//     parsedData: {
//       contactEmail: parsedData.contactEmail,
//       // Add other dynamic data properties here
//     },
//     // Add other dynamic data properties if needed
//   };


// const Form2: React.FC<{ onGeneratePDF: (pdfUrl: string) => void }> = ({ onGeneratePDF }) => {

// useEffect(()=>{
//     Font.register({
//       family: 'Oswald',
//       src: 'https://fonts.gstatic.com/s/oswald/v32/TK3iWkUHHAIjg752GT8D.ttf',
//     });
//     const styles = StyleSheet.create({
//       body: {
//         fontFamily: 'Oswald',
//         padding: 30,
//         paddingTop: 35,
//         paddingBottom: 65,
//         paddingHorizontal: 35,
//       },
//       title: {
//         fontSize: 24,
//         textAlign: 'center',
//         fontFamily: 'Oswald'
//       },
//       author: {
//         fontSize: 12,
//         textAlign: 'center',
//         marginBottom: 40,
//       },
//       subtitle: {
//         fontSize: 18,
//         margin: 12,
//         fontFamily: 'Oswald'
//       },
//       text: {
//         margin: 12,

//         textAlign: 'justify',
//         fontFamily: 'Times-Roman'
//       },
//       image: {
//         marginVertical: 15,
//         marginHorizontal: 100,
//       },
//       header: {
//         fontSize: 12,
//         marginBottom: 20,
//         textAlign: 'center',
//         color: 'grey',
//       },
//       pageNumber: {
//         position: 'absolute',
//         fontSize: 12,
//         bottom: 30,
//         left: 0,
//         right: 0,
//         textAlign: 'center',
//         color: 'grey',
//       },
//     });

//     const generatePDF = async() => {
//       const pdfContent = (
//         <Document>
//         <Page style={styles.body}>

//           <Text style={styles.header} fixed>
//             ~ Created with react-pdf ~
//           </Text>
//           <Text style={styles.title}>Don Quijote de la Mancha</Text>
//           <Text style={styles.author}>Miguel de Cervantes</Text>

//           <Text style={styles.subtitle}>
//             Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
//             Quijote de la Mancha
//           </Text>

//           <Text style={styles.subtitle}>
//           {dynamicData.parsedData.contactEmail}
//           </Text>
//           <Text style={styles.text}>
//             En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
//             mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
//             antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
//             carnero, salpicón las más noches, duelos y quebrantos los sábados,
//             lentejas los viernes, algún palomino de añadidura los domingos,
//             consumían las tres partes de su hacienda. El resto della concluían sayo
//             de velarte, calzas de velludo para las fiestas con sus pantuflos de lo
//             mismo, los días de entre semana se honraba con su vellori de lo más
//             fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina
//             que no llegaba a los veinte, y un mozo de campo y plaza, que así
//             ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro
//             hidalgo con los cincuenta años, era de complexión recia, seco de carnes,
//             enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que
//             tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna
//             diferencia en los autores que deste caso escriben), aunque por
//             conjeturas verosímiles se deja entender que se llama Quijana; pero esto
//             importa poco a nuestro cuento; basta que en la narración dél no se salga
//             un punto de la verdad
//           </Text>
//           <Text style={styles.text}>
//             Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba
//             ocioso (que eran los más del año) se daba a leer libros de caballerías
//             con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de
//             la caza, y aun la administración de su hacienda; y llegó a tanto su
//             curiosidad y desatino en esto, que vendió muchas hanegas de tierra de
//             sembradura, para comprar libros de caballerías en que leer; y así llevó
//             a su casa todos cuantos pudo haber dellos; y de todos ningunos le
//             parecían tan bien como los que compuso el famoso Feliciano de Silva:
//             porque la claridad de su prosa, y aquellas intrincadas razones suyas, le
//             parecían de perlas; y más cuando llegaba a leer aquellos requiebros y
//             cartas de desafío, donde en muchas partes hallaba escrito: la razón de
//             la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece,
//             que con razón me quejo de la vuestra fermosura, y también cuando leía:
//             los altos cielos que de vuestra divinidad divinamente con las estrellas
//             se fortifican, y os hacen merecedora del merecimiento que merece la
//             vuestra grandeza.
//           </Text>
//           <Text style={styles.text}>
//             Con estas y semejantes razones perdía el pobre caballero el juicio, y
//             desvelábase por entenderlas, y desentrañarles el sentido, que no se lo
//             sacara, ni las entendiera el mismo Aristóteles, si resucitara para sólo
//             ello. No estaba muy bien con las heridas que don Belianis daba y
//             recibía, porque se imaginaba que por grandes maestros que le hubiesen
//             curado, no dejaría de tener el rostro y todo el cuerpo lleno de
//             cicatrices y señales; pero con todo alababa en su autor aquel acabar su
//             libro con la promesa de aquella inacabable aventura, y muchas veces le
//             vino deseo de tomar la pluma, y darle fin al pie de la letra como allí
//             se promete; y sin duda alguna lo hiciera, y aun saliera con ello, si
//             otros mayores y continuos pensamientos no se lo estorbaran. Tuvo muchas
//             veces competencia con el cura de su lugar (que era hombre docto graduado
//             en Sigüenza), sobre cuál había sido mejor caballero, Palmerín de
//             Inglaterra o Amadís de Gaula; mas maese Nicolás, barbero del mismo
//             pueblo, decía que ninguno llegaba al caballero del Febo, y que si alguno
//             se le podía comparar, era don Galaor, hermano de Amadís de Gaula, porque
//             tenía muy acomodada condición para todo; que no era caballero
//             melindroso, ni tan llorón como su hermano, y que en lo de la valentía no
//             le iba en zaga.
//           </Text>
//           <Text style={styles.text}>
//             En resolución, él se enfrascó tanto en su lectura, que se le pasaban las
//             noches leyendo de claro en claro, y los días de turbio en turbio, y así,
//             del poco dormir y del mucho leer, se le secó el cerebro, de manera que
//             vino a perder el juicio. Llenósele la fantasía de todo aquello que leía
//             en los libros, así de encantamientos, como de pendencias, batallas,
//             desafíos, heridas, requiebros, amores, tormentas y disparates
//             imposibles, y asentósele de tal modo en la imaginación que era verdad
//             toda aquella máquina de aquellas soñadas invenciones que leía, que para
//             él no había otra historia más cierta en el mundo.
//           </Text>
//           <Text style={styles.subtitle} break>
//             Capítulo II: Que trata de la primera salida que de su tierra hizo el
//             ingenioso Don Quijote
//           </Text>

//           <Text style={styles.text}>
//             Hechas, pues, estas prevenciones, no quiso aguardar más tiempo a poner
//             en efeto su pensamiento, apretándole a ello la falta que él pensaba que
//             hacía en el mundo su tardanza, según eran los agravios que pensaba
//             deshacer, tuertos que enderezar, sinrazones que emendar y abusos que
//             mejorar y deudas que satisfacer. Y así, sin dar parte a persona alguna
//             de su intención y sin que nadie le viese, una mañana, antes del día, que
//             era uno de los calurosos del mes de Julio, se armó de todas sus armas,
//             subió sobre Rocinante, puesta su mal compuesta celada, embrazó su
//             adarga, tomó su lanza y por la puerta falsa de un corral salió al campo
//             con grandísimo contento y alborozo de ver con cuánta facilidad había
//             dado principio a su buen deseo. Mas apenas se vio en el campo cuando le
//             asaltó un pensamiento terrible, y tal, que por poco le hiciera dejar la
//             comenzada empresa; y fue que le vino a la memoria que no era armado
//             caballero, y que, conforme a ley de caballería, ni podía ni debía tomar
//             armas con ningún caballero; y puesto que lo fuera, había de llevar armas
//             blancas, como novel caballero, sin empresa en el escudo, hasta que por
//             su esfuerzo la ganase. Estos pensamientos le hicieron titubear en su
//             propósito; mas pudiendo más su locura que otra razón alguna, propuso de
//             hacerse armar caballero del primero que topase, a imitación de otros
//             muchos que así lo hicieron, según él había leído en los libros que tal
//             le tenían. En lo de las armas blancas, pensaba limpiarlas de manera, en
//             teniendo lugar, que lo fuesen más que un arminio; y con esto se quietó18
//             y prosiguió su camino, sin llevar otro que aquel que su caballo quería,
//             creyendo que en aquello consistía la fuerza de las aventuras
//           </Text>
//           <Text style={styles.text}>
//             Yendo, pues, caminando nuestro flamante aventurero, iba hablando consigo
//             mesmo, y diciendo: —¿Quién duda, sino que en los venideros tiempos,
//             cuando salga a luz la verdadera historia de mis famosos hechos, que el
//             sabio que los escribiere no ponga, cuando llegue a contar esta mi
//             primera salida tan de mañana, desta manera?: Apenas había el rubicundo
//             Apolo tendido por la faz de la ancha y espaciosa tierra las doradas
//             hebras de sus hermosos cabellos, y apenas los pequeños y pintados
//             pajarillos con sus arpadas lenguas habían saludado con dulce y meliflua
//             armonía la venida de la rosada Aurora, que, dejando la blanda cama del
//             celoso marido, por las puertas y balcones del manchego horizonte a los
//             mortales se mostraba, cuando el famoso caballero don Quijote de la
//             Mancha, dejando las ociosas plumas, subió sobre su famoso caballo
//             Rocinante y comenzó a caminar por el antiguo y conocido Campo de
//             Montiel.
//           </Text>
//           <Text style={styles.text}>
//             Y era la verdad que por él caminaba; y añadió diciendo: —Dichosa edad y
//             siglo dichoso aquel adonde saldrán a luz las famosas hazañas mías,
//             dignas de entallarse en bronces, esculpirse en mármoles y pintarse en
//             tablas, para memoria en lo futuro. ¡Oh tú, sabio encantador, quienquiera
//             que seas, a quien ha de tocar el ser coronista desta peregrina historia!
//             Ruégote que no te olvides de mi buen Rocinante, compañero eterno mío en
//             todos mis caminos y carreras.
//           </Text>
//           <Text style={styles.text}>
//             Luego volvía diciendo, como si verdaderamente fuera enamorado: —¡Oh
//             princesa Dulcinea, señora deste cautivo corazón! Mucho agravio me
//             habedes fecho en despedirme y reprocharme con el riguroso afincamiento
//             de mandarme no parecer ante la vuestra fermosura. Plégaos, señora, de
//             membraros deste vuestro sujeto corazón, que tantas cuitas por vuestro
//             amor padece. Con estos iba ensartando otros disparates, todos al modo de
//             los que sus libros le habían enseñado, imitando en cuanto podía su
//             lenguaje. Con esto caminaba tan despacio, y el sol entraba tan apriesa y
//             con tanto ardor, que fuera bastante a derretirle los sesos, si algunos
//             tuviera
//           </Text>
//           <Text style={styles.text}>
//             Casi todo aquel día caminó sin acontecerle cosa que de contar fuese, de
//             lo cual se desesperaba, porque quisiera topar luego luego con quien
//             hacer experiencia del valor de su fuerte brazo. Autores hay que dicen
//             que la primera aventura que le avino fue la del Puerto Lápice, otros
//             dicen que la de los molinos de viento; pero lo que yo he podido
//             averiguar en este caso, y lo que he hallado escrito en los anales de la
//             Mancha, es que él anduvo todo aquel día, y, al anochecer, su rocín y él
//             se hallaron cansados y muertos de hambre, y que, mirando a todas partes
//             por ver si descubriría algún castillo o alguna majada de pastores donde
//             recogerse y adonde pudiese remediar su mucha hambre y necesidad, vio, no
//             lejos del camino por donde iba, una venta,que fue como si viera una
//             estrella que, no a los portales, sino a los alcázares de su redención le
//             encaminaba. Diose priesa a caminar, y llegó a ella a tiempo que
//             anochecía.
//           </Text>
//           <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
//             `${pageNumber} / ${totalPages}`
//           )} fixed />
//         </Page>
//       </Document>
//       );

//       const blob = await pdf(pdfContent).toBlob();
//       const pdfUrl = URL.createObjectURL(blob);
//       onGeneratePDF(pdfUrl);
//     };
//     generatePDF();
//   },[onGeneratePDF])



//   return <></>;







//  }


// export default Form2
'use client'

import React, { useRef } from 'react'

export default function Form2() {

  const boxRef: any = useRef()

  const downloadPDF = () => {
    const newWindow: any = window.open();

    const html = document.createElement("html");
    const head = document.head.cloneNode(true);
    const body = document.createElement("body");
    let name = document.createElement("name");
    name.style.color = 'red'

    body.appendChild(boxRef.current);
    html.appendChild(head);
    html.appendChild(body);
    newWindow.document.write(html.innerHTML);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();

  }


  return (
    <>
      <section ref={boxRef}>
        <p id="name" style={{ backgroundColor: 'red' }}>
          In publishing and graphic design, Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/) is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.
        </p>
        Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin. The first two words themselves are a truncation of dolorem ipsum ("pain itself").

        Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets.[1] Lorem ipsum was introduced to the digital world in the mid-1980s, when Aldus employed it in graphic and word-processing templates for its desktop publishing program PageMaker. Other popular word processors, including Pages and Microsoft Word, have since adopted Lorem ipsum,[2] as have many LaTeX packages,[3][4][5] web content managers such as Joomla! and WordPress, and CSS libraries such as Semantic UI.[6]

        Example text
        A common form of Lorem ipsum reads:

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Source text

        This article possibly contains original research. The citation only links the translation; The highlighting appears to be user-generated. Please improve it by verifying the claims made and adding inline citations. Statements consisting only of original research should be removed. (October 2023) (Learn how and when to remove this template message)
        The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's De finibus bonorum et malorum.[7][8] The physical source may have been the 1914 Loeb Classical Library edition of De finibus, where the Latin text, presented on the left-hand (even) pages, breaks off on page 34 with "Neque porro quisquam est qui do-" and continues on page 36 with "lorem ipsum ...", suggesting that the galley type of that page was mixed up to make the dummy text seen today.[1]

        The discovery of the text's origin is attributed to Richard McClintock, a Latin scholar at Hampden–Sydney College. McClintock connected Lorem ipsum to Cicero's writing sometime before 1982 while searching for instances of the Latin word consectetur, which was rarely used in classical literature.[2] McClintock first published his discovery in a 1994 letter to the editor of Before & After magazine,[9] contesting the editor's earlier claim that Lorem ipsum held no meaning.[2]

        The relevant section of Cicero as printed in the source is reproduced below with fragments used in Lorem ipsum highlighted. Letters in brackets were added to Lorem ipsum and were not present in the source text:

        [32] Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum[d] exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? [D]Quis autem vel eum i[r]ure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?

        [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem reru[d]um facilis est e[r]t expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellend[a]us. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

        What follows is H. Rackham's translation, as printed in the 1914 Loeb edition, with words at least partially represented in Lorem ipsum highlighted:[8]

        [32] But I must explain to you how all this mistaken idea of reprobating pleasure and extolling pain arose. To do so, I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

        [33] On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammeled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.

        See also
        Asemic writing – Wordless open semantic form of writing
        Etaoin shrdlu – Common metal-type printing error
        Gibberish – Nonsensical language
        Hamburgevons – Text used as a sample for assessing fonts
        Indian-head test pattern – Television test card
        Lenna – Standard test image
        Li Europan lingues – Placeholder text in Interlingue
        Metasyntactic variable – Placeholder term used in computer science
        Pangram – Sentence using every letter of alphabet
        The quick brown fox jumps over the lazy dog – Sentence containing all letters of the English alphabet
        Shibboleth – Custom or tradition that distinguishes one group from another
        "To come" – Phrase used in publishing to indicate missing material
        Utah teapot – Computer graphics 3D reference and test model

        In publishing and graphic design, Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/) is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.

        Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin. The first two words themselves are a truncation of dolorem ipsum ("pain itself").

        Versions of the Lorem ipsum text have been used in typesetting at least since the 1960s, when it was popularized by advertisements for Letraset transfer sheets.[1] Lorem ipsum was introduced to the digital world in the mid-1980s, when Aldus employed it in graphic and word-processing templates for its desktop publishing program PageMaker. Other popular word processors, including Pages and Microsoft Word, have since adopted Lorem ipsum,[2] as have many LaTeX packages,[3][4][5] web content managers such as Joomla! and WordPress, and CSS libraries such as Semantic UI.[6]

        Example text
        A common form of Lorem ipsum reads:

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Source text

        This article possibly contains original research. The citation only links the translation; The highlighting appears to be user-generated. Please improve it by verifying the claims made and adding inline citations. Statements consisting only of original research should be removed. (October 2023) (Learn how and when to remove this template message)
        The Lorem ipsum text is derived from sections 1.10.32 and 1.10.33 of Cicero's De finibus bonorum et malorum.[7][8] The physical source may have been the 1914 Loeb Classical Library edition of De finibus, where the Latin text, presented on the left-hand (even) pages, breaks off on page 34 with "Neque porro quisquam est qui do-" and continues on page 36 with "lorem ipsum ...", suggesting that the galley type of that page was mixed up to make the dummy text seen today.[1]

        The discovery of the text's origin is attributed to Richard McClintock, a Latin scholar at Hampden–Sydney College. McClintock connected Lorem ipsum to Cicero's writing sometime before 1982 while searching for instances of the Latin word consectetur, which was rarely used in classical literature.[2] McClintock first published his discovery in a 1994 letter to the editor of Before & After magazine,[9] contesting the editor's earlier claim that Lorem ipsum held no meaning.[2]

        The relevant section of Cicero as printed in the source is reproduced below with fragments used in Lorem ipsum highlighted. Letters in brackets were added to Lorem ipsum and were not present in the source text:

        [32] Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum[d] exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? [D]Quis autem vel eum i[r]ure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?

        [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem reru[d]um facilis est e[r]t expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellend[a]us. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

        What follows is H. Rackham's translation, as printed in the 1914 Loeb edition, with words at least partially represented in Lorem ipsum highlighted:[8]

        [32] But I must explain to you how all this mistaken idea of reprobating pleasure and extolling pain arose. To do so, I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?

        [33] On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammeled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.

        See also
        Asemic writing – Wordless open semantic form of writing
        Etaoin shrdlu – Common metal-type printing error
        Gibberish – Nonsensical language
        Hamburgevons – Text used as a sample for assessing fonts
        Indian-head test pattern – Television test card
        Lenna – Standard test image
        Li Europan lingues – Placeholder text in Interlingue
        Metasyntactic variable – Placeholder term used in computer science
        Pangram – Sentence using every letter of alphabet
        The quick brown fox jumps over the lazy dog – Sentence containing all letters of the English alphabet
        Shibboleth – Custom or tradition that distinguishes one group from another
        "To come" – Phrase used in publishing to indicate missing material
        Utah teapot – Computer graphics 3D reference and test model
        <img src={'https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'} />
      </section>
      <button onClick={downloadPDF}>click me</button>
    </>
  )
}
