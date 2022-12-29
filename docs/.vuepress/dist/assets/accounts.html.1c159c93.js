import{_ as s,r,o,c as a,a as e,b as i,F as c,d as n,e as d}from"./app.84696b05.js";var l="/assets/account_example.5b70d95a.jpeg";const h={},u=e("h1",{id:"accounts",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#accounts","aria-hidden":"true"},"#"),n(" Accounts")],-1),m=e("p",null,"Accounts innerhalb von Solana werden zum Speichern des Zustands verwendet. Sie sind ein wesentlicher Baustein f\xFCr die Entwicklung auf Solana.",-1),p=e("h2",{id:"fakten",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#fakten","aria-hidden":"true"},"#"),n(" Fakten")],-1),_={class:"custom-container tip"},g=e("p",{class:"custom-container-title"},"Fact Sheet",-1),f=e("li",null,"Accounts werden genutzt um Daten zu speichern",-1),b=e("li",null,"Jedes Konto hat eine eindeutige (einmalig vorhandene) Adresse",-1),A=e("li",null,"Accounts haben eine maximale Gr\xF6\xDFe von 10MB (10 Mega Bytes)",-1),z=e("li",null,"PDA Accounts haben eine maximale Gr\xF6\xDFe von 10KB (10 Kilo Bytes)",-1),w=e("li",null,"PDA Accounts k\xF6nnen verwendet werden, um im Namen eines Programms zu signieren",-1),k=n("Accountgr\xF6\xDFen sind bei erstellung festgelegt, k\xF6nnen aber mit "),v={href:"https://solanacookbook.com/references/programs.html#how-to-change-account-size",target:"_blank",rel:"noopener noreferrer"},D=n("realloc"),S=n(" angepasst werden"),x=e("li",null,'F\xFCr Accountsdatenspeicher wird "Miete" gezahlt (in SOL)',-1),K=e("li",null,"Der Standard-Accounts-Besitzer ist das Systemprogramm",-1),M=d('<h2 id="deep-dive" tabindex="-1"><a class="header-anchor" href="#deep-dive" aria-hidden="true">#</a> Deep Dive</h2><h3 id="accounts-model" tabindex="-1"><a class="header-anchor" href="#accounts-model" aria-hidden="true">#</a> Accounts Model</h3><p>Auf Solana gibt es 3 Arten von Accounts:</p><ul><li>Daten Accounts speichern Daten</li><li>Program Accounts speichern ausf\xFChrbare Programme</li><li>Native Accounts die native Programme auf Solana angeben (wie z.B. System, Stake, und Vote )</li></ul><p>Es gibt 2 Arten von Daten Accounts:</p><ul><li>Systemeigene Accounts</li><li>PDA-Accounts (Program Derived Address).</li></ul><p>Jedes Konto hat eine Adresse (normalerweise einen \xF6ffentlichen Schl\xFCssel) und einen Besitzer (Adresse eines Programmkontos). Die vollst\xE4ndige Feldliste speichert ein Konto ist unten zu finden.</p><table><thead><tr><th>Feld</th><th>Beschreibung</th></tr></thead><tbody><tr><td>lamports</td><td>Die Anzahl der Lamports im Besitz dieses Kontos</td></tr><tr><td>owner</td><td>Der Programmbesitzer dieses Kontos</td></tr><tr><td>executable</td><td>Ob dieses Konto Anweisungen verarbeiten kann</td></tr><tr><td>data</td><td>Das Rohdaten-Byte-Array, das von diesem Konto gespeichert wird</td></tr><tr><td>rent_epoch</td><td>Die n\xE4chste Epoche, in der dieses Konto Miete schuldet</td></tr></tbody></table><p>Es gibt ein paar wichtige Eigentumsregeln:</p><ul><li>Nur der Besitzer eines Datenkontos kann seine Daten \xE4ndern und Lamports belasten</li><li>Jeder darf Lamports auf ein Datenkonto gutschreiben</li><li>Der Inhaber eines Kontos kann einen neuen Inhaber zuweisen, wenn die Daten des Kontos auf Null gesetzt werden</li></ul><p>ProgrammAccounts speichern keinen Status.</p><p>Wenn Du beispielsweise ein Z\xE4hlerprogramm hast, mit dem Du einen Z\xE4hler erh\xF6hen kannst, musst Du zwei Accounts erstellen - ein Konto zum Speichern des Programmcodes und eines zum Speichern der Z\xE4hler.</p><p><img src="'+l+'" alt=""></p><p>Um zu verhindern, dass ein Konto gel\xF6scht wird, m\xFCssen Sie Miete zahlen.</p><h3 id="miete" tabindex="-1"><a class="header-anchor" href="#miete" aria-hidden="true">#</a> Miete</h3><p>Daten auf Accounts zu speichern kostet SOL - diese Zahlung wird Miete genannt. Wenn du eine Mindesteinzahlung von 2 Jahren Miete t\xE4tigst, wird dein Account von zuk\xFCnftiger Miete befreit. Du kannst vorausgezahlte Miete durch schlie\xDFen von Accounts zur\xFCck in deine Wallet bekommen.</p><p>Die Miete wird zu zwei verschiedenen Zeitpunkten gezahlt:</p><ol><li>Wenn es von einer Transaktion referenziert wird</li><li>Einmal pro Epoche</li></ol><p>Ein Teil der \xFCber Accounts eingezogenen Miete wird vernichtet, w\xE4hrend der Rest verteilt wird Accounts am Ende jedes Slots zu bestimmen.</p><p>Reicht das Konto nicht aus, um die Miete zu zahlen, wird das Konto aufgel\xF6st und die Daten ENTFERNT.</p><p>Wichtig ist auch zu beachten, dass NeuAccounts mietfrei sein m\xFCssen.</p><h2 id="andere-ressourcen" tabindex="-1"><a class="header-anchor" href="#andere-ressourcen" aria-hidden="true">#</a> Andere Ressourcen</h2>',22),B={href:"https://solana.wiki/zh-cn/docs/de/account-model/#account-storage",target:"_blank",rel:"noopener noreferrer"},E=n("Solana Accounts Model"),P={href:"https://docs.solana.com/developing/programming-model/accounts",target:"_blank",rel:"noopener noreferrer"},N=n("Official Documentation"),y={href:"https://twitter.com/pencilflip/status/1452402100470644739",target:"_blank",rel:"noopener noreferrer"},F=n("pencilflip account thread"),L=e("h3",{id:"credit",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#credit","aria-hidden":"true"},"#"),n(" Credit")],-1),T=n("Dieses Kernkonzept wird Pencilflip zugeschrieben. "),Z={href:"https://twitter.com/intent/user?screen_name=pencilflip",target:"_blank",rel:"noopener noreferrer"},R=n("Folgt ihm auf Twitter"),V=n(".");function W(I,J){const t=r("ExternalLinkIcon");return o(),a(c,null,[u,m,p,e("div",_,[g,e("ul",null,[f,b,A,z,w,e("li",null,[k,e("a",v,[D,i(t)]),S]),x,K])]),M,e("ul",null,[e("li",null,[e("a",B,[E,i(t)])]),e("li",null,[e("a",P,[N,i(t)])]),e("li",null,[e("a",y,[F,i(t)])])]),L,e("p",null,[T,e("a",Z,[R,i(t)]),V])],64)}var j=s(h,[["render",W]]);export{j as default};
