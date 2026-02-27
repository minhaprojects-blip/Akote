import { useState } from "react";
import { LOGO_B64, LOGO_SM_B64 } from "./logo.js";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
// Direction : Blanc propre + vert ancré + orange action. 
// Typographie : Syne (display power) + Outfit (body lisible).
// Principe : chaque écran a UN seul CTA principal, visible immédiatement.
const C = {
  green:     "#16803C",
  greenDark: "#0D5C2A",
  greenPale: "#F0FDF4",
  greenMid:  "#DCFCE7",
  orange:    "#EA580C",
  orangePale:"#FFF7ED",
  orangeMid: "#FFEDD5",
  bg:        "#FFFFFF",
  bgOff:     "#F8FAFC",
  text:      "#0F172A",
  textMid:   "#334155",
  textSoft:  "#64748B",
  textMuted: "#94A3B8",
  border:    "#E2E8F0",
  borderMid: "#CBD5E1",
  red:       "#DC2626",
  redPale:   "#FEF2F2",
  shadow:    "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)",
  shadowMd:  "0 4px 16px rgba(0,0,0,.10)",
  shadowLg:  "0 12px 40px rgba(0,0,0,.14)",
};

const FONT  = "'Outfit', sans-serif";
const FONTS = "'Syne', sans-serif";

// ─── DONNÉES ───────────────────────────────────────────────────────────────
const USERS_DB = [
  {id:1,name:"Marie Dupont",email:"marie@email.com",password:"1234",role:"client",avatar:"MD"},
  {id:2,name:"Jean Martin",email:"jean@email.com",password:"1234",role:"client",avatar:"JM"},
  {id:3,name:"Patron Lefèvre",email:"boulangerie@email.com",password:"1234",role:"commerce",commerceId:1,avatar:"BL"},
  {id:4,name:"Admin Akoté",email:"admin@akote.fr",password:"admin",role:"admin",avatar:"AA"},
];

const COMMERCES_INIT = [
  {id:1,name:"Boulangerie Lefèvre",category:"Boulangerie",emoji:"🥐",color:"#FEF3C7",colorText:"#92400E",address:"12 Rue de la République",hours:"7h–19h30 · Dim 7h–13h",phone:"01 48 34 34 56",rating:4.6,reviews:38,open:true,description:"Artisan boulanger depuis 1987. Pains au levain, viennoiseries maison, pâtisseries de saison.",tags:["Bio","Artisan","Sur commande"],promos:[{id:1,title:"Happy Hour",desc:"30% sur viennoiseries après 17h",discount:"−30%",active:true},{id:2,title:"Carte fidélité",desc:"10ème baguette offerte",discount:"Gratuit",active:true}],comments:[{user:"Marie D.",rating:5,text:"Pain au levain exceptionnel !",date:"18 fév"},{user:"Karim B.",rating:4,text:"Très bon, un peu cher mais ça vaut le coup.",date:"10 fév"}],stats:{views:342,favorites:28}},
  {id:2,name:"Épicerie du Marché",category:"Épicerie",emoji:"🛒",color:"#D1FAE5",colorText:"#065F46",address:"5 Rue du Moutier",hours:"8h–21h tous les jours",phone:"01 48 34 78 90",rating:3.8,reviews:21,open:true,description:"Épicerie de proximité avec produits frais, fruits & légumes du marché.",tags:["Frais","Import","7j/7"],promos:[{id:3,title:"Lundi frais",desc:"Fruits & légumes −20% chaque lundi",discount:"−20%",active:true}],comments:[{user:"Jean M.",rating:3,text:"Pratique mais parfois en rupture.",date:"20 fév"}],stats:{views:198,favorites:12}},
  {id:3,name:"Pharmacie Centrale",category:"Pharmacie",emoji:"💊",color:"#DBEAFE",colorText:"#1E40AF",address:"8 Av. Division Leclerc",hours:"9h–19h · Sam 9h–17h",phone:"01 48 39 11 22",rating:4.2,reviews:55,open:false,description:"Pharmacie de garde certains week-ends. Conseil personnalisé, parapharmacie.",tags:["Garde","Conseil","Para"],promos:[],comments:[{user:"Paul R.",rating:4,text:"Personnel très attentionné.",date:"15 fév"}],stats:{views:512,favorites:44}},
  {id:4,name:"Café Le Central",category:"Café",emoji:"☕",color:"#FEE2E2",colorText:"#991B1B",address:"3 Place de la Mairie",hours:"7h–20h · Lun–Sam",phone:"01 48 34 55 66",rating:4.4,reviews:67,open:true,description:"Bar brasserie convivial en plein cœur d'Aubervilliers. Petite restauration le midi.",tags:["Terrasse","Midi","Presse"],promos:[{id:4,title:"Petit-déj",desc:"Café + croissant à 2,50€ avant 9h",discount:"2,50€",active:true}],comments:[{user:"Thierry L.",rating:5,text:"Super ambiance !",date:"19 fév"}],stats:{views:289,favorites:31}},
  {id:5,name:"Fleurs & Jardins",category:"Fleuriste",emoji:"🌸",color:"#FCE7F3",colorText:"#9D174D",address:"22 Rue Édouard Vaillant",hours:"9h–18h · Dim 9h–13h",phone:"01 48 33 44 33",rating:4.8,reviews:29,open:true,description:"Compositions florales sur mesure pour toutes les occasions, bouquets de saison.",tags:["Sur mesure","Mariage","Livraison"],promos:[{id:5,title:"Bouquet printemps",desc:"Bouquet de saison dès 15€",discount:"Dès 15€",active:true}],comments:[{user:"Céline V.",rating:5,text:"Bouquet magnifique pour mon mariage !",date:"12 fév"}],stats:{views:167,favorites:22}},
  {id:6,name:"Auto École Victor Hugo",category:"Services",emoji:"🚗",color:"#EDE9FE",colorText:"#5B21B6",address:"15 Av. Victor Hugo",hours:"9h–18h · Lun–Sam",phone:"01 48 36 99 88",rating:3.5,reviews:18,open:true,description:"Formation permis B, conduite accompagnée, code en ligne.",tags:["Permis B","AAC","Code"],promos:[{id:6,title:"Code offert",desc:"Accès gratuit pour tout nouvel élève",discount:"Gratuit",active:true}],comments:[{user:"Nadia H.",rating:3,text:"Moniteur sympa mais attente longue.",date:"8 fév"}],stats:{views:124,favorites:8}},
];

const CLAIMS_INIT = [
  {id:1,clientName:"Marie Dupont",clientId:1,commerce:"Boulangerie Lefèvre",commerceId:1,subject:"Produit périmé vendu",description:"Brioche périmée de 2 jours.",status:"En cours",category:"Qualité produit",date:"18/02",messages:[{from:"client",text:"Brioche périmée achetée hier.",date:"18/02 10:30"},{from:"commerce",text:"Désolés, venez pour un remboursement.",date:"18/02 14:00"}]},
  {id:2,clientName:"Jean Martin",clientId:2,commerce:"Épicerie du Marché",commerceId:2,subject:"Accueil désagréable",description:"Personnel impoli.",status:"En attente",category:"Service client",date:"20/02",messages:[{from:"client",text:"Personnel très impoli lors de ma visite.",date:"20/02 09:15"}]},
];

const VILLES = [
  {id:"aubervilliers",name:"Aubervilliers",cp:"93300",emoji:"🏙️",dispo:true},
  {id:"saint-denis",name:"Saint-Denis",cp:"93200",emoji:"⚽",dispo:false},
  {id:"pantin",name:"Pantin",cp:"93500",emoji:"🎨",dispo:false},
  {id:"bobigny",name:"Bobigny",cp:"93000",emoji:"⚖️",dispo:false},
  {id:"stains",name:"Stains",cp:"93240",emoji:"🌳",dispo:false},
];

const CATEGORIES = ["Tous","Boulangerie","Épicerie","Pharmacie","Café","Fleuriste","Services"];

// ─── ATOMS ─────────────────────────────────────────────────────────────────

function Avatar({ name, size=36 }) {
  const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const colors = ["#16803C","#EA580C","#1D4ED8","#7C3AED","#DB2777"];
  const color  = colors[name.charCodeAt(0)%colors.length];
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:color,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:FONT,fontWeight:700,fontSize:size*.37,flexShrink:0}}>
      {initials}
    </div>
  );
}

function Stars({ n, small=false }) {
  return (
    <span style={{display:"inline-flex",gap:1}}>
      {[1,2,3,4,5].map(i=>(
        <svg key={i} width={small?10:13} height={small?10:13} viewBox="0 0 12 12">
          <polygon points="6,0 7.5,4.5 12,4.5 8.5,7.5 9.5,12 6,9 2.5,12 3.5,7.5 0,4.5 4.5,4.5" fill={i<=Math.round(n)?"#F59E0B":"#E2E8F0"}/>
        </svg>
      ))}
    </span>
  );
}

function Tag({ children, color="#64748B", bg="#F1F5F9" }) {
  return <span style={{padding:"3px 10px",borderRadius:20,background:bg,color,fontFamily:FONT,fontSize:11,fontWeight:600}}>{children}</span>;
}

function Btn({ children, variant="primary", onClick, style={}, size="md", disabled=false }) {
  const sizes = { sm:{padding:"7px 16px",fontSize:13}, md:{padding:"11px 22px",fontSize:14}, lg:{padding:"14px 28px",fontSize:15} };
  const V = {
    primary: {background:C.green,color:"#fff",border:"none",boxShadow:`0 2px 8px rgba(22,128,60,.35)`},
    orange:  {background:C.orange,color:"#fff",border:"none",boxShadow:`0 2px 8px rgba(234,88,12,.35)`},
    outline: {background:"transparent",color:C.green,border:`1.5px solid ${C.green}`},
    ghost:   {background:"transparent",color:C.textSoft,border:`1px solid ${C.border}`},
    danger:  {background:C.redPale,color:C.red,border:`1px solid #FECACA`},
  };
  return (
    <button disabled={disabled} onClick={onClick} style={{
      ...sizes[size],...V[variant],borderRadius:10,cursor:disabled?"not-allowed":"pointer",
      fontFamily:FONT,fontWeight:700,opacity:disabled?.5:1,transition:"all .15s",
      display:"inline-flex",alignItems:"center",gap:6,...style,
    }}>{children}</button>
  );
}

const CLAIM_STATUS = {
  "En attente":{bg:"#FEF9C3",color:"#854D0E"},
  "En cours":  {bg:"#DBEAFE",color:"#1E40AF"},
  "Résolu":    {bg:"#DCFCE7",color:"#166534"},
  "Fermé":     {bg:"#F1F5F9",color:"#475569"},
};

// ─── VILLE SELECTOR ────────────────────────────────────────────────────────
function VilleSelector({ onSelect }) {
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,background:"#FFFFFF"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700;800&display=swap');*{margin:0;padding:0;box-sizing:border-box;}`}</style>
      {/* Hero mark */}
      <div style={{marginBottom:40,textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:12,marginBottom:16}}>
          <img src={LOGO_SM_B64} alt="Akoté" style={{width:56,height:56,borderRadius:14,boxShadow:"0 4px 16px rgba(0,0,0,.1)"}}/>
          <span style={{fontFamily:FONTS,fontWeight:800,fontSize:34,color:C.text,letterSpacing:"-1px"}}>Akoté</span>
        </div>
        <p style={{fontFamily:FONT,fontSize:16,color:C.textSoft,maxWidth:340,lineHeight:1.5}}>
          Les commerces de votre quartier, réunis au même endroit.
        </p>
      </div>

      <div style={{width:"100%",maxWidth:420}}>
        <div style={{fontFamily:FONT,fontWeight:700,fontSize:13,color:C.textMuted,textTransform:"uppercase",letterSpacing:1,marginBottom:14}}>Choisissez votre ville</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
          {VILLES.map(v=>(
            <button key={v.id} onClick={()=>v.dispo&&onSelect(v)} style={{
              display:"flex",alignItems:"center",gap:14,padding:"14px 18px",
              borderRadius:12,border:`1.5px solid ${v.dispo?C.green:C.border}`,
              background:v.dispo?C.greenPale:C.bgOff,
              cursor:v.dispo?"pointer":"not-allowed",textAlign:"left",
              opacity:v.dispo?1:.55,transition:"all .15s",
            }}>
              <span style={{fontSize:24}}>{v.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:FONT,fontWeight:700,fontSize:15,color:v.dispo?C.text:C.textMuted}}>{v.name}</div>
                <div style={{fontFamily:FONT,fontSize:12,color:C.textMuted}}>{v.cp} · Seine-Saint-Denis</div>
              </div>
              {v.dispo
                ? <span style={{background:C.green,color:"#fff",borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:700}}>Disponible</span>
                : <span style={{background:C.border,color:C.textMuted,borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:600}}>Bientôt</span>
              }
            </button>
          ))}
        </div>
        <div style={{padding:"12px 16px",background:C.orangePale,borderRadius:10,border:`1px solid ${C.orangeMid}`,fontFamily:FONT,fontSize:13,color:C.orange,fontWeight:600}}>
          🚀 Votre ville n'est pas listée ? Contactez-nous — elle arrive bientôt.
        </div>
      </div>
    </div>
  );
}

// ─── AUTH ──────────────────────────────────────────────────────────────────
function AuthPage({ onLogin }) {
  const [tab,setTab]   = useState("login");
  const [email,setEmail] = useState("");
  const [pw,setPw]     = useState("");
  const [name,setName] = useState("");
  const [err,setErr]   = useState("");

  const login = () => {
    const u = USERS_DB.find(u=>u.email===email&&u.password===pw);
    if(u) { setErr(""); onLogin(u); }
    else setErr("Email ou mot de passe incorrect.");
  };

  const iSt = {width:"100%",padding:"11px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontFamily:FONT,fontSize:14,color:C.text,background:C.bg,outline:"none",boxSizing:"border-box"};

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bgOff,padding:20}}>
      <div style={{width:"100%",maxWidth:400,background:C.bg,borderRadius:20,padding:32,boxShadow:C.shadowLg}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:8}}>
            <img src={LOGO_SM_B64} alt="Akoté" style={{width:40,height:40,borderRadius:10}}/>
            <span style={{fontFamily:FONTS,fontWeight:800,fontSize:24,color:C.text}}>Akoté</span>
          </div>
          <p style={{fontFamily:FONT,fontSize:13,color:C.textSoft}}>Connectez-vous pour accéder à votre espace</p>
        </div>

        <div style={{display:"flex",background:C.bgOff,borderRadius:10,padding:3,marginBottom:22}}>
          {["login","register"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"8px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:FONT,fontWeight:600,fontSize:13,background:tab===t?C.bg:C.transparent,color:tab===t?C.text:C.textMuted,boxShadow:tab===t?C.shadow:"none",transition:"all .15s"}}>
              {t==="login"?"Connexion":"Créer un compte"}
            </button>
          ))}
        </div>

        {err && <div style={{padding:"10px 14px",background:C.redPale,border:`1px solid #FECACA`,borderRadius:9,marginBottom:14,fontFamily:FONT,fontSize:13,color:C.red}}>⚠️ {err}</div>}

        {tab==="login" && (
          <>
            <div style={{marginBottom:12}}><label style={{fontFamily:FONT,fontSize:12,fontWeight:600,color:C.textMuted,display:"block",marginBottom:5}}>EMAIL</label><input style={iSt} type="email" placeholder="votre@email.fr" value={email} onChange={e=>setEmail(e.target.value)}/></div>
            <div style={{marginBottom:20}}><label style={{fontFamily:FONT,fontSize:12,fontWeight:600,color:C.textMuted,display:"block",marginBottom:5}}>MOT DE PASSE</label><input style={iSt} type="password" placeholder="••••••" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()}/></div>
            <Btn size="lg" style={{width:"100%",justifyContent:"center",marginBottom:16}} onClick={login}>Se connecter</Btn>
            <div style={{fontFamily:FONT,fontSize:12,color:C.textMuted,textAlign:"center",padding:"10px",background:C.bgOff,borderRadius:8}}>
              <strong>Démo :</strong> marie@email.com · 1234 (client) | boulangerie@email.com · 1234 (commerce)
            </div>
          </>
        )}
        {tab==="register" && (
          <>
            <div style={{marginBottom:12}}><label style={{fontFamily:FONT,fontSize:12,fontWeight:600,color:C.textMuted,display:"block",marginBottom:5}}>NOM COMPLET</label><input style={iSt} placeholder="Marie Dupont" value={name} onChange={e=>setName(e.target.value)}/></div>
            <div style={{marginBottom:12}}><label style={{fontFamily:FONT,fontSize:12,fontWeight:600,color:C.textMuted,display:"block",marginBottom:5}}>EMAIL</label><input style={iSt} type="email" placeholder="votre@email.fr" value={email} onChange={e=>setEmail(e.target.value)}/></div>
            <div style={{marginBottom:20}}><label style={{fontFamily:FONT,fontSize:12,fontWeight:600,color:C.textMuted,display:"block",marginBottom:5}}>MOT DE PASSE</label><input style={iSt} type="password" placeholder="••••••" value={pw} onChange={e=>setPw(e.target.value)}/></div>
            <Btn size="lg" style={{width:"100%",justifyContent:"center"}} variant="orange" onClick={()=>onLogin({id:99,name,email,role:"client",avatar:name.slice(0,2).toUpperCase()})}>
              Créer mon compte →
            </Btn>
          </>
        )}
      </div>
    </div>
  );
}

// ─── NAV ───────────────────────────────────────────────────────────────────
function Nav({ page, setPage, user, onLogout, ville, onChangeVille, favorites }) {
  const [menu,setMenu] = useState(false);
  const navItems = [
    {key:"home",label:"Accueil"},
    {key:"promos",label:"Bons plans"},
    {key:"map",label:"Carte"},
    {key:"claims",label:"Réclamations"},
    {key:"faq",label:"FAQ"},
    {key:"contact",label:"Contact"},
    ...(user?.role==="commerce"?[{key:"dashboard",label:"Mon espace"}]:[]),
  ];
  return (
    <header style={{background:C.bg,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:100}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",height:60,display:"flex",alignItems:"center",gap:16}}>
        {/* Logo */}
        <button onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",flexShrink:0}}>
          <img src={LOGO_SM_B64} alt="Akoté" style={{width:32,height:32,borderRadius:8}}/>
          <span style={{fontFamily:FONTS,fontWeight:800,fontSize:20,color:C.text,letterSpacing:"-0.5px"}}>Akoté</span>
        </button>

        {/* Ville pill */}
        <button onClick={onChangeVille} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:20,border:`1px solid ${C.border}`,background:C.bgOff,cursor:"pointer",flexShrink:0}}>
          <span style={{fontSize:14}}>{ville?.emoji}</span>
          <span style={{fontFamily:FONT,fontSize:12,fontWeight:600,color:C.textMid}}>{ville?.name}</span>
          <span style={{fontSize:10,color:C.textMuted}}>▼</span>
        </button>

        {/* Nav links */}
        <nav style={{display:"flex",gap:4,flex:1,overflowX:"auto"}}>
          {navItems.map(n=>(
            <button key={n.key} onClick={()=>setPage(n.key)} style={{
              padding:"6px 12px",borderRadius:8,border:"none",cursor:"pointer",
              background:page===n.key?C.greenPale:"transparent",
              color:page===n.key?C.green:C.textSoft,
              fontFamily:FONT,fontWeight:600,fontSize:13,whiteSpace:"nowrap",
              transition:"all .15s",
            }}>{n.label}</button>
          ))}
        </nav>

        {/* User */}
        <div style={{position:"relative",flexShrink:0}}>
          <button onClick={()=>setMenu(!menu)} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:"4px 8px",borderRadius:10}}>
            <Avatar name={user?.name||"?"} size={32}/>
            <div style={{textAlign:"left"}}>
              <div style={{fontFamily:FONT,fontWeight:700,fontSize:13,color:C.text,lineHeight:1}}>{user?.name?.split(" ")[0]}</div>
              <div style={{fontFamily:FONT,fontSize:11,color:C.textMuted,textTransform:"capitalize"}}>{user?.role}</div>
            </div>
          </button>
          {menu && (
            <div style={{position:"absolute",right:0,top:"calc(100% + 8px)",background:C.bg,borderRadius:12,border:`1px solid ${C.border}`,boxShadow:C.shadowMd,padding:8,minWidth:180,zIndex:200}}>
              <div style={{padding:"6px 10px",borderBottom:`1px solid ${C.border}`,marginBottom:6}}>
                <div style={{fontFamily:FONT,fontWeight:600,fontSize:13,color:C.text}}>{user?.name}</div>
                <div style={{fontFamily:FONT,fontSize:12,color:C.textMuted}}>{user?.email}</div>
              </div>
              {favorites?.length>0&&<button onClick={()=>{setPage("home");setMenu(false);}} style={{width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:8,border:"none",background:"none",cursor:"pointer",fontFamily:FONT,fontSize:13,color:C.text}}>❤️ Favoris ({favorites.length})</button>}
              <button onClick={()=>{onLogout();setMenu(false);}} style={{width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:8,border:"none",background:"none",cursor:"pointer",fontFamily:FONT,fontSize:13,color:C.red}}>← Déconnexion</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────
function HomePage({ commerces, onSelect, favorites, toggleFavorite, ville }) {
  const [cat,setCat]       = useState("Tous");
  const [search,setSearch] = useState("");
  const [onlyOpen,setOnly] = useState(false);

  let list = commerces;
  if(cat!=="Tous")  list = list.filter(c=>c.category===cat);
  if(search.trim()) list = list.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.category.toLowerCase().includes(search.toLowerCase()));
  if(onlyOpen)      list = list.filter(c=>c.open);

  const promoCount = commerces.reduce((s,c)=>s+c.promos.filter(p=>p.active).length,0);

  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px"}}>

      {/* Hero banner */}
      <div style={{background:`linear-gradient(110deg,${C.greenDark} 0%,${C.green} 100%)`,borderRadius:20,padding:"28px 32px",marginBottom:28,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,top:-20,width:220,height:220,borderRadius:"50%",background:"rgba(255,255,255,.06)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:60,bottom:-60,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,.04)",pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap"}}>
          <div>
            <div style={{fontFamily:FONTS,fontWeight:800,fontSize:28,color:"#fff",letterSpacing:"-0.5px",marginBottom:6}}>
              Bonjour 👋 — {ville?.name}
            </div>
            <p style={{fontFamily:FONT,fontSize:14,color:"rgba(255,255,255,.75)",marginBottom:16}}>
              {commerces.filter(c=>c.open).length} commerces ouverts · {promoCount} bons plans en cours
            </p>
            <div style={{display:"flex",gap:8"}}>
              <div style={{display:"inline-flex",gap:8}}>
                <div style={{padding:"7px 14px",background:"rgba(255,255,255,.15)",borderRadius:20,fontFamily:FONT,fontSize:13,color:"#fff",fontWeight:600}}>
                  🏷️ {promoCount} promos actives
                </div>
                <div style={{padding:"7px 14px",background:"rgba(255,255,255,.15)",borderRadius:20,fontFamily:FONT,fontSize:13,color:"#fff",fontWeight:600}}>
                  ⭐ {(commerces.reduce((s,c)=>s+c.rating,0)/commerces.length).toFixed(1)} note moy.
                </div>
              </div>
            </div>
          </div>
          <div style={{flexShrink:0}}>
            <div style={{fontFamily:FONT,fontSize:12,color:"rgba(255,255,255,.65)",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>Catégories populaires</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {["🥐 Boulangerie","☕ Café","🌸 Fleuriste"].map(c=>(
                <button key={c} onClick={()=>{setCat(c.split(" ")[1]);}} style={{padding:"7px 14px",borderRadius:20,border:"1.5px solid rgba(255,255,255,.3)",background:"rgba(255,255,255,.1)",color:"#fff",fontFamily:FONT,fontWeight:600,fontSize:13,cursor:"pointer"}}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search + filtres */}
      <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:240,position:"relative"}}>
          <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15,color:C.textMuted}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un commerce, une catégorie..."
            style={{width:"100%",padding:"11px 14px 11px 40px",borderRadius:12,border:`1.5px solid ${C.border}`,fontFamily:FONT,fontSize:14,color:C.text,outline:"none",boxSizing:"border-box",boxShadow:C.shadow}}/>
        </div>
        <button onClick={()=>setOnly(!onlyOpen)} style={{padding:"11px 18px",borderRadius:12,border:`1.5px solid ${onlyOpen?C.green:C.border}`,background:onlyOpen?C.greenPale:C.bg,color:onlyOpen?C.green:C.textSoft,fontFamily:FONT,fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>
          {onlyOpen?"✓ ":""}Ouverts maintenant
        </button>
      </div>

      {/* Catégories pills */}
      <div style={{display:"flex",gap:8,overflowX:"auto",marginBottom:24,paddingBottom:4}}>
        {CATEGORIES.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{padding:"8px 18px",borderRadius:20,border:`1.5px solid ${cat===c?C.green:C.border}`,background:cat===c?C.green:C.bg,color:cat===c?"#fff":C.textMid,fontFamily:FONT,fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s",flexShrink:0}}>
            {c}
          </button>
        ))}
      </div>

      {/* Grille commerces */}
      {list.length===0
        ? <div style={{textAlign:"center",padding:"60px 20px",color:C.textMuted,fontFamily:FONT}}>Aucun commerce trouvé pour ces critères.</div>
        : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
            {list.map(c=><CommerceCard key={c.id} c={c} onSelect={onSelect} favorites={favorites} toggleFavorite={toggleFavorite}/>)}
          </div>
      }
    </div>
  );
}

function CommerceCard({ c, onSelect, favorites, toggleFavorite }) {
  const isFav = favorites?.includes(c.id);
  const activePromo = c.promos.find(p=>p.active);

  return (
    <div style={{background:C.bg,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden",boxShadow:C.shadow,transition:"all .2s",cursor:"pointer"}} onClick={()=>onSelect(c)}>
      {/* Bandeau couleur catégorie */}
      <div style={{height:8,background:c.color||C.greenMid}}/>
      <div style={{padding:"16px 18px"}}>
        {/* Header card */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:44,height:44,borderRadius:12,background:c.color||C.greenMid,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
              {c.emoji}
            </div>
            <div>
              <div style={{fontFamily:FONT,fontWeight:700,fontSize:15,color:C.text,lineHeight:1.2}}>{c.name}</div>
              <div style={{fontFamily:FONT,fontSize:12,color:C.textMuted,marginTop:2}}>{c.category}</div>
            </div>
          </div>
          <button onClick={e=>{e.stopPropagation();toggleFavorite(c.id);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,padding:2,flexShrink:0}}>
            {isFav?"❤️":"🤍"}
          </button>
        </div>

        {/* Rating + statut */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <Stars n={c.rating}/>
          <span style={{fontFamily:FONT,fontWeight:700,fontSize:13,color:C.text}}>{c.rating}</span>
          <span style={{fontFamily:FONT,fontSize:12,color:C.textMuted}}>({c.reviews} avis)</span>
          <span style={{marginLeft:"auto",padding:"3px 10px",borderRadius:20,background:c.open?C.greenMid:C.bgOff,color:c.open?C.green:C.textMuted,fontFamily:FONT,fontSize:11,fontWeight:700}}>
            {c.open?"● Ouvert":"● Fermé"}
          </span>
        </div>

        {/* Adresse + horaires */}
        <div style={{fontFamily:FONT,fontSize:12,color:C.textSoft,marginBottom:12,lineHeight:1.5}}>
          📍 {c.address}<br/>
          🕐 {c.hours}
        </div>

        {/* Promo badge si dispo */}
        {activePromo && (
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:C.orangePale,border:`1px solid ${C.orangeMid}`,borderRadius:10,marginBottom:12}}>
            <span style={{fontFamily:FONT,fontWeight:800,fontSize:13,color:C.orange}}>{activePromo.discount}</span>
            <span style={{fontFamily:FONT,fontSize:12,color:C.textSoft,flex:1}}>{activePromo.desc}</span>
          </div>
        )}

        {/* CTA */}
        <button onClick={e=>{e.stopPropagation();onSelect(c);}} style={{
          width:"100%",padding:"10px",borderRadius:10,border:"none",cursor:"pointer",
          background:C.green,color:"#fff",fontFamily:FONT,fontWeight:700,fontSize:13,
          transition:"all .15s",
        }}>
          Voir le commerce →
        </button>
      </div>
    </div>
  );
}

// ─── COMMERCE DETAIL ───────────────────────────────────────────────────────
function CommerceDetail({ commerce, onBack, onClaim, favorites, toggleFavorite, user }) {
  const [tab,setTab]   = useState("info");
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("");
  const [reviews,setReviews] = useState(commerce.comments||[]);
  const isFav = favorites?.includes(commerce.id);

  const submitReview = () => {
    if(!rating||!comment.trim()) return;
    setReviews(p=>[{user:user?.name?.split(" ")[0]+" "+user?.name?.split(" ")[1]?.[0]+".",rating,text:comment,date:"Maintenant"},...p]);
    setRating(0); setComment("");
  };

  const tabs = ["info","avis","promos"];
  const tabLabel = {info:"Informations",avis:`Avis (${reviews.length})`,promos:`Promotions (${commerce.promos.length})`};

  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:"24px 20px"}}>
      {/* Retour */}
      <button onClick={onBack} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",fontFamily:FONT,fontSize:14,color:C.textSoft,marginBottom:20,padding:0}}>
        ← Retour aux commerces
      </button>

      {/* Hero commerce */}
      <div style={{background:`linear-gradient(110deg,${commerce.color||C.greenMid},${commerce.color||C.greenMid}88)`,borderRadius:20,padding:"24px 26px",marginBottom:20,border:`1px solid ${C.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <div style={{width:64,height:64,borderRadius:16,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,boxShadow:C.shadow}}>
              {commerce.emoji}
            </div>
            <div>
              <div style={{fontFamily:FONTS,fontWeight:800,fontSize:24,color:C.text,letterSpacing:"-0.5px"}}>{commerce.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
                <Stars n={commerce.rating}/>
                <span style={{fontFamily:FONT,fontWeight:700,fontSize:14,color:C.text}}>{commerce.rating}</span>
                <span style={{fontFamily:FONT,fontSize:13,color:C.textSoft}}>· {commerce.reviews} avis</span>
                <span style={{padding:"2px 10px",borderRadius:20,background:commerce.open?"#fff":"rgba(0,0,0,.1)",color:commerce.open?C.green:C.textMuted,fontFamily:FONT,fontSize:11,fontWeight:700}}>
                  {commerce.open?"● Ouvert":"● Fermé"}
                </span>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:8"}}>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>toggleFavorite(commerce.id)} style={{width:40,height:40,borderRadius:10,border:`1px solid ${C.border}`,background:"#fff",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>{isFav?"❤️":"🤍"}</button>
              <Btn variant="danger" size="sm" onClick={()=>onClaim(commerce)}>Signaler un problème</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:4,background:C.bgOff,borderRadius:12,padding:4,marginBottom:20}}>
        {tabs.map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            flex:1,padding:"9px",borderRadius:9,border:"none",cursor:"pointer",
            background:tab===t?C.bg:"transparent",color:tab===t?C.text:C.textSoft,
            fontFamily:FONT,fontWeight:600,fontSize:13,boxShadow:tab===t?C.shadow:"none",transition:"all .15s",
          }}>{tabLabel[t]}</button>
        ))}
      </div>

      {/* Tab info */}
      {tab==="info" && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[
            {icon:"📍",label:"Adresse",val:commerce.address},
            {icon:"🕐",label:"Horaires",val:commerce.hours},
            {icon:"📞",label:"Téléphone",val:commerce.phone},
            {icon:"🏷️",label:"Catégorie",val:commerce.category},
          ].map(info=>(
            <div key={info.label} style={{padding:"14px 16px",background:C.bgOff,borderRadius:12,border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:FONT,fontSize:11,fontWeight:600,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{info.icon} {info.label}</div>
              <div style={{fontFamily:FONT,fontSize:14,color:C.text,fontWeight:500}}>{info.val}</div>
            </div>
          ))}
          <div style={{gridColumn:"1/-1",padding:"14px 16px",background:C.bgOff,borderRadius:12,border:`1px solid ${C.border}`}}>
            <div style={{fontFamily:FONT,fontSize:11,fontWeight:600,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>📝 Description</div>
            <div style={{fontFamily:FONT,fontSize:14,color:C.text,lineHeight:1.6}}>{commerce.description}</div>
          </div>
          <div style={{gridColumn:"1/-1",display:"flex",gap:8,flexWrap:"wrap"}}>
            {commerce.tags?.map(t=><Tag key={t}>{t}</Tag>)}
          </div>
          {/* CTA contact */}
          <div style={{gridColumn:"1/-1",display:"flex",gap:10"}}>
            <div style={{gridColumn:"1/-1",display:"flex",gap:10}}>
              <Btn size="lg" style={{flex:1,justifyContent:"center"}} onClick={()=>{}}>📞 Appeler</Btn>
              <Btn size="lg" variant="outline" style={{flex:1,justifyContent:"center"}} onClick={()=>{}}>🗺️ Itinéraire</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Tab avis */}
      {tab==="avis" && (
        <div>
          {/* Laisser un avis */}
          <div style={{padding:"18px",background:C.bgOff,borderRadius:14,border:`1px solid ${C.border}`,marginBottom:18}}>
            <div style={{fontFamily:FONT,fontWeight:700,fontSize:14,color:C.text,marginBottom:12}}>Laisser un avis</div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {[1,2,3,4,5].map(i=>(
                <button key={i} onClick={()=>setRating(i)} style={{fontSize:24,background:"none",border:"none",cursor:"pointer",opacity:i<=rating?1:.25,transition:"all .1s"}}>★</button>
              ))}
            </div>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Partagez votre expérience..."
              style={{width:"100%",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${C.border}`,fontFamily:FONT,fontSize:13,color:C.text,background:C.bg,resize:"none",height:80,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
            <Btn onClick={submitReview} disabled={!rating||!comment.trim()}>Publier mon avis</Btn>
          </div>
          {reviews.map((r,i)=>(
            <div key={i} style={{padding:"14px 16px",background:C.bg,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <Avatar name={r.user} size={28}/>
                  <span style={{fontFamily:FONT,fontWeight:600,fontSize:13,color:C.text}}>{r.user}</span>
                  <Stars n={r.rating} small/>
                </div>
                <span style={{fontFamily:FONT,fontSize:11,color:C.textMuted}}>{r.date}</span>
              </div>
              <p style={{fontFamily:FONT,fontSize:13,color:C.textMid,lineHeight:1.5,margin:0}}>{r.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab promos */}
      {tab==="promos" && (
        <div>
          {commerce.promos.length===0
            ? <div style={{textAlign:"center",padding:"40px",color:C.textMuted,fontFamily:FONT}}>Aucune promotion en cours.</div>
            : commerce.promos.map(p=>(
              <div key={p.id} style={{padding:"16px 18px",background:C.bg,borderRadius:14,border:`1px solid ${C.border}`,marginBottom:12,display:"flex",alignItems:"center",gap:16}}>
                <div style={{width:56,height:56,borderRadius:12,background:C.orangePale,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontFamily:FONTS,fontWeight:800,fontSize:14,color:C.orange,lineHeight:1}}>{p.discount}</span>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:FONT,fontWeight:700,fontSize:14,color:C.text,marginBottom:3}}>{p.title}</div>
                  <div style={{fontFamily:FONT,fontSize:13,color:C.textSoft}}>{p.desc}</div>
                </div>
                <Btn variant="orange" size="sm">En profiter →</Btn>
              </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PROMOS PAGE ───────────────────────────────────────────────────────────
function PromosPage({ commerces, onSelect }) {
  const allPromos = commerces.flatMap(c=>c.promos.filter(p=>p.active).map(p=>({...p,commerceName:c.name,commerceEmoji:c.emoji,commerce:c})));
  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{marginBottom:24}}>
        <div style={{fontFamily:FONTS,fontWeight:800,fontSize:28,color:C.text,letterSpacing:"-0.5px",marginBottom:4}}>🏷️ Bons plans</div>
        <p style={{fontFamily:FONT,fontSize:14,color:C.textSoft}}>{allPromos.length} offres actives chez vos commerçants</p>
      </div>
      {/* Hero promo */}
      {allPromos[0] && (
        <div style={{background:`linear-gradient(110deg,${C.orange},#D97706)`,borderRadius:20,padding:"24px 28px",marginBottom:24,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:16}} onClick={()=>onSelect(allPromos[0].commerce)}>
          <div>
            <div style={{fontFamily:FONT,fontSize:12,fontWeight:700,color:"rgba(255,255,255,.7)",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>⭐ Offre du moment</div>
            <div style={{fontFamily:FONTS,fontWeight:800,fontSize:24,color:"#fff",marginBottom:4}}>{allPromos[0].title}</div>
            <div style={{fontFamily:FONT,fontSize:14,color:"rgba(255,255,255,.85)"}}>{allPromos[0].desc} · {allPromos[0].commerceName}</div>
          </div>
          <div style={{textAlign:"center",flexShrink:0}}>
            <div style={{fontFamily:FONTS,fontWeight:800,fontSize:36,color:"#fff"}}>{allPromos[0].discount}</div>
            <Btn variant="ghost" size="sm" style={{color:"#fff",border:"1.5px solid rgba(255,255,255,.5)",marginTop:8}}>Voir →</Btn>
          </div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
        {allPromos.slice(1).map((p,i)=>(
          <div key={i} style={{background:C.bg,borderRadius:14,border:`1px solid ${C.border}`,padding:"16px 18px",cursor:"pointer",display:"flex",gap:14,alignItems:"center",boxShadow:C.shadow}} onClick={()=>onSelect(p.commerce)}>
            <div style={{width:52,height:52,borderRadius:12,background:C.orangePale,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontFamily:FONTS,fontWeight:800,fontSize:13,color:C.orange,lineHeight:1,textAlign:"center"}}>{p.discount}</span>
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:FONT,fontWeight:700,fontSize:14,color:C.text}}>{p.title}</div>
              <div style={{fontFamily:FONT,fontSize:12,color:C.textSoft,marginTop:2}}>{p.desc}</div>
              <div style={{fontFamily:FONT,fontSize:11,color:C.textMuted,marginTop:4}}>{p.commerceEmoji} {p.commerceName}</div>
            </div>
            <span style={{fontSize:18,flexShrink:0}}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAP PAGE ──────────────────────────────────────────────────────────────
function MapPage({ commerces, onSelect, ville }) {
  const [hover,setHover] = useState(null);
  const pins = [
    {id:1,x:45,y:38},{id:2,x:62,y:55},{id:3,x:35,y:62},{id:4,x:55,y:30},
    {id:5,x:72,y:48},{id:6,x:28,y:45},
  ];
  return (
    <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{fontFamily:FONTS,fontWeight:800,fontSize:28,color:C.text,letterSpacing:"-0.5px",marginBottom:4}}>🗺️ Carte</div>
      <p style={{fontFamily:FONT,fontSize:14,color:C.textSoft,marginBottom:20}}>{ville?.name} · {commerces.length} commerces référencés</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16,alignItems:"flex-start"}}>
        <div style={{background:C.bgOff,borderRadius:16,border:`1px solid ${C.border}`,height:460,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,#E8F4E8 0%,#D1E8D1 50%,#C8DFCA 100%)"}}/>
          <div style={{position:"absolute",top:"30%",left:"20%",width:"60%",height:"35%",background:"rgba(200,225,200,.6)",borderRadius:8}}/>
          <div style={{position:"absolute",top:"20%",left:"15%",right:"15%",height:4,background:"rgba(150,200,150,.8)",borderRadius:2}}/>
          <div style={{position:"absolute",top:"55%",left:"10%",right:"20%",height:4,background:"rgba(150,200,150,.8)",borderRadius:2}}/>
          {pins.map(pin=>{
            const c = commerces.find(c=>c.id===pin.id);
            return (
              <button key={pin.id} onClick={()=>onSelect(c)} onMouseEnter={()=>setHover(pin.id)} onMouseLeave={()=>setHover(null)}
                style={{position:"absolute",left:`${pin.x}%`,top:`${pin.y}%`,transform:"translate(-50%,-100%)",background:"none",border:"none",cursor:"pointer"}}>
                <div style={{background:hover===pin.id?C.orange:C.green,borderRadius:"50% 50% 50% 0",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:C.shadowMd,transform:"rotate(-45deg)",transition:"all .15s"}}>
                  <span style={{transform:"rotate(45deg)"}}>{c?.emoji}</span>
                </div>
                {hover===pin.id && <div style={{position:"absolute",bottom:"110%",left:"50%",transform:"translateX(-50%)",background:C.text,color:"#fff",borderRadius:8,padding:"4px 10px",whiteSpace:"nowrap",fontFamily:FONT,fontSize:11,fontWeight:600}}>{c?.name}</div>}
              </button>
            );
          })}
          <div style={{position:"absolute",bottom:12,right:12,background:"#fff",borderRadius:8,padding:"6px 10px",fontFamily:FONT,fontSize:11,color:C.textMuted,boxShadow:C.shadow}}>📍 {ville?.name}, {ville?.cp}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:460,overflowY:"auto"}}>
          {commerces.map(c=>(
            <div key={c.id} onClick={()=>onSelect(c)} style={{padding:"12px 14px",background:C.bg,borderRadius:12,border:`1px solid ${C.border}`,cursor:"pointer",display:"flex",gap:10,alignItems:"center",boxShadow:C.shadow}}>
              <span style={{fontSize:20}}>{c.emoji}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:FONT,fontWeight:700,fontSize:13,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                <div style={{fontFamily:FONT,fontSize:11,color:C.textMuted}}>{c.address}</div>
              </div>
              <span style={{width:8,height:8,borderRadius:"50%",background:c.open?C.green:C.textMuted,flexShrink:0}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CLAIMS PAGE ───────────────────────────────────────────────────────────
function ClaimsPage({ claims, setClaims, user, preselect, setPreselect }) {
  const [sel,setSel]     = useState(preselect?.id||null);
  const [reply,setReply] = useState("");
  const [note,setNote]   = useState("");
  const [newForm,setNewForm] = useState({subject:"",description:"",category:"Qualité produit",commerceId:preselect?.id||""});
  const [view,setView]   = useState(preselect?"new":"list");

  const role = user?.role;
  const myC  = claims.filter(c=> role==="client"?c.clientId===user.id: role==="commerce"?c.commerceId===user.commerceId:true);
  const selC = claims.find(c=>c.id===sel);

  const send = (from) => {
    const txt = from==="admin"?note:reply;
    if(!txt.trim()) return;
    setClaims(p=>p.map(c=>c.id===sel?{...c,messages:[...c.messages,{from,text:txt,date:new Date().toLocaleDateString("fr")}]}:c));
    from==="admin"?setNote(""):setReply("");
  };

  const submit = () => {
    setClaims(p=>[...p,{id:Date.now(),clientName:user.name,clientId:user.id,commerce:"Commerce",commerceId:parseInt(newForm.commerceId),subject:newForm.subject,description:newForm.description,status:"En attente",category:newForm.category,date:new Date().toLocaleDateString("fr"),messages:[{from:"client",text:newForm.description,date:new Date().toLocaleDateString("fr")}]}]);
    setView("list");
  };

  const iSt = {width:"100%",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${C.border}`,fontFamily:FONT,fontSize:13,color:C.text,background:C.bgOff,outline:"none",boxSizing:"border-box"};

  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div>
          <div style={{fontFamily:FONTS,fontWeight:800,fontSize:28,color:C.text,letterSpacing:"-0.5px"}}>📋 Réclamations</div>
          <p style={{fontFamily:FONT,fontSize:14,color:C.textSoft,marginTop:2}}>{myC.length} réclamation(s)</p>
        </div>
        {role==="client" && <Btn onClick={()=>setView(view==="new"?"list":"new")} variant={view==="new"?"ghost":"primary"}>{view==="new"?"← Retour":"+ Nouvelle réclamation"}</Btn>}
      </div>

      {view==="new" && (
        <div style={{maxWidth:540,background:C.bg,borderRadius:16,border:`1px solid ${C.border}`,padding:24,marginBottom:24}}>
          <div style={{fontFamily:FONT,fontWeight:700,fontSize:16,color:C.text,marginBottom:18}}>Nouvelle réclamation</div>
          {[
            {label:"Sujet",key:"subject",placeholder:"Décrivez le problème en bref"},
            {label:"Catégorie",key:"category",options:["Qualité produit","Service client","Commande","Autre"]},
            {label:"Description",key:"description",textarea:true,placeholder:"Détaillez votre situation..."},
          ].map(f=>(
            <div key={f.key} style={{marginBottom:14}}>
              <label style={{fontFamily:FONT,fontSize:12,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>{f.label}</label>
              {f.options
                ? <select style={iSt} value={newForm[f.key]} onChange={e=>setNewForm({...newForm,[f.key]:e.target.value})}>{f.options.map(o=><option key={o}>{o}</option>)}</select>
                : f.textarea
                  ? <textarea style={{...iSt,height:90,resize:"none"}} placeholder={f.placeholder} value={newForm[f.key]} onChange={e=>setNewForm({...newForm,[f.key]:e.target.value})}/>
                  : <input style={iSt} placeholder={f.placeholder} value={newForm[f.key]} onChange={e=>setNewForm({...newForm,[f.key]:e.target.value})}/>
              }
            </div>
          ))}
          <Btn size="lg" style={{width:"100%",justifyContent:"center"}} onClick={submit}>Envoyer la réclamation →</Btn>
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:sel?"1fr 1fr":"1fr",gap:16}}>
        <div>
          {myC.map(c=>(
            <div key={c.id} onClick={()=>setSel(sel===c.id?null:c.id)} style={{
              padding:"14px 16px",background:C.bg,borderRadius:14,border:`1.5px solid ${sel===c.id?C.green:C.border}`,
              cursor:"pointer",marginBottom:10,transition:"all .15s",
            }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{fontFamily:FONT,fontWeight:700,fontSize:14,color:C.text}}>{c.subject}</div>
                <span style={{padding:"3px 10px",borderRadius:20,fontFamily:FONT,fontSize:11,fontWeight:700,...CLAIM_STATUS[c.status]}}>{c.status}</span>
              </div>
              <div style={{fontFamily:FONT,fontSize:12,color:C.textSoft}}>{c.commerce} · {c.clientName} · {c.date}</div>
              <div style={{fontFamily:FONT,fontSize:12,color:C.textMuted,marginTop:4}}>{c.messages.length} message(s)</div>
            </div>
          ))}
        </div>
        {selC && (
          <div style={{background:C.bg,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden"}}>
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontFamily:FONT,fontWeight:700,fontSize:14,color:C.text}}>{selC.subject}</div>
                <div style={{fontFamily:FONT,fontSize:12,color:C.textMuted}}>{selC.commerce} · {selC.clientName}</div>
              </div>
              {(role==="commerce"||role==="admin")&&(
                <select value={selC.status} onChange={e=>setClaims(p=>p.map(c=>c.id===sel?{...c,status:e.target.value}:c))}
                  style={{padding:"5px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontFamily:FONT,fontSize:12,background:C.bgOff,color:C.text}}>
                  {["En attente","En cours","Résolu","Fermé"].map(s=><option key={s}>{s}</option>)}
                </select>
              )}
            </div>
            <div style={{padding:"14px 18px",maxHeight:260,overflowY:"auto",display:"flex",flexDirection:"column",gap:10}}>
              {selC.messages.map((m,i)=>(
                <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.from==="client"?"flex-start":m.from==="admin"?"center":"flex-end"}}>
                  <div style={{fontSize:10,color:C.textMuted,marginBottom:3,paddingLeft:4}}>{m.from==="client"?selC.clientName:m.from==="admin"?"🛡️ Admin":selC.commerce} · {m.date}</div>
                  <div style={{maxWidth:"80%",padding:"9px 13px",borderRadius:m.from==="client"?"12px 12px 12px 3px":m.from==="admin"?"8px":"12px 12px 3px 12px",background:m.from==="client"?C.bgOff:m.from==="admin"?"#FEF9C3":C.green,color:m.from==="commerce"?"#fff":C.text,fontFamily:FONT,fontSize:13,lineHeight:1.5}}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            {role==="commerce"&&(
              <div style={{padding:"12px 18px",borderTop:`1px solid ${C.border}`}}>
                <textarea value={reply} onChange={e=>setReply(e.target.value)} placeholder="Répondre..." style={{width:"100%",padding:"9px 12px",borderRadius:10,border:`1px solid ${C.border}`,fontFamily:FONT,fontSize:13,color:C.text,background:C.bgOff,resize:"none",height:60,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
                <Btn size="sm" onClick={()=>send("commerce")}>Envoyer</Btn>
              </div>
            )}
            {role==="admin"&&(
              <div style={{padding:"12px 18px",borderTop:`1px solid ${C.border}`,background:"#FFFBF0"}}>
                <div style={{fontFamily:FONT,fontSize:11,fontWeight:700,color:C.orange,marginBottom:6}}>🛡️ INTERVENTION ADMIN</div>
                <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Intervenir..." style={{width:"100%",padding:"9px 12px",borderRadius:10,border:`1.5px solid ${C.orangeMid}`,fontFamily:FONT,fontSize:13,color:C.text,background:C.bgOff,resize:"none",height:60,outline:"none",boxSizing:"border-box",marginBottom:8}}/>
                <Btn size="sm" variant="orange" onClick={()=>send("admin")}>Intervenir</Btn>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD COMMERCE ────────────────────────────────────────────────────
function Dashboard({ commerces, user, setCommerces }) {
  const [tab,setTab] = useState("stats");
  const commerce = commerces.find(c=>c.id===user.commerceId)||commerces[0];
  if(!commerce) return <div style={{padding:40,fontFamily:FONT,color:C.textMuted}}>Aucun commerce associé.</div>;

  const [form,setForm] = useState({name:commerce.name,address:commerce.address,hours:commerce.hours,phone:commerce.phone,description:commerce.description});
  const [saved,setSaved] = useState(false);
  const [newPromo,setNewPromo] = useState({title:"",desc:"",discount:""});

  const save = () => {
    setCommerces(p=>p.map(c=>c.id===commerce.id?{...c,...form}:c));
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const addPromo = () => {
    if(!newPromo.title.trim()) return;
    setCommerces(p=>p.map(c=>c.id===commerce.id?{...c,promos:[...c.promos,{id:Date.now(),...newPromo,active:true}]}:c));
    setNewPromo({title:"",desc:"",discount:""});
  };

  const iSt = {width:"100%",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${C.border}`,fontFamily:FONT,fontSize:13,color:C.text,background:C.bgOff,outline:"none",boxSizing:"border-box"};

  const tabs = [{k:"stats",l:"Statistiques"},{k:"profil",l:"Mon profil"},{k:"promos",l:"Promotions"}];

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{marginBottom:24}}>
        <div style={{fontFamily:FONTS,fontWeight:800,fontSize:28,color:C.text,letterSpacing:"-0.5px"}}>{commerce.emoji} {commerce.name}</div>
        <p style={{fontFamily:FONT,fontSize:14,color:C.textSoft,marginTop:2}}>Votre espace commerçant</p>
      </div>

      <div style={{display:"flex",gap:4,background:C.bgOff,borderRadius:12,padding:4,marginBottom:24,maxWidth:400}}>
        {tabs.map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"9px",borderRadius:9,border:"none",cursor:"pointer",background:tab===t.k?C.bg:"transparent",color:tab===t.k?C.text:C.textSoft,fontFamily:FONT,fontWeight:600,fontSize:13,boxShadow:tab===t.k?C.shadow:"none"}}>
            {t.l}
          </button>
        ))}
      </div>

      {tab==="stats" && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {[{icon:"👁️",label:"Vues",v:commerce.stats?.views},{icon:"❤️",label:"Favoris",v:commerce.stats?.favorites},{icon:"⭐",label:"Note",v:commerce.rating},{icon:"💬",label:"Avis",v:commerce.reviews}].map(s=>(
            <div key={s.label} style={{padding:"16px",background:C.bg,borderRadius:12,border:`1px solid ${C.border}`,textAlign:"center"}}>
              <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
              <div style={{fontFamily:FONTS,fontWeight:800,fontSize:26,color:C.text}}>{s.v}</div>
              <div style={{fontFamily:FONT,fontSize:12,color:C.textMuted,marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {tab==="profil" && (
        <div style={{maxWidth:520}}>
          {saved && <div style={{padding:"10px 14px",background:C.greenMid,border:`1px solid #A7F3D0`,borderRadius:10,marginBottom:16,fontFamily:FONT,fontSize:13,color:C.greenDark,fontWeight:700}}>✅ Profil mis à jour !</div>}
          {[{k:"name",l:"Nom du commerce"},{k:"address",l:"Adresse"},{k:"hours",l:"Horaires"},{k:"phone",l:"Téléphone"}].map(f=>(
            <div key={f.k} style={{marginBottom:14}}>
              <label style={{fontFamily:FONT,fontSize:12,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>{f.l}</label>
              <input style={iSt} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})}/>
            </div>
          ))}
          <div style={{marginBottom:18}}>
            <label style={{fontFamily:FONT,fontSize:12,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Description</label>
            <textarea style={{...iSt,height:90,resize:"none"}} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
          </div>
          <Btn size="lg" style={{width:"100%",justifyContent:"center"}} onClick={save}>💾 Enregistrer les modifications</Btn>
        </div>
      )}

      {tab==="promos" && (
        <div>
          <div style={{padding:"18px",background:C.bgOff,borderRadius:14,border:`1px solid ${C.border}`,marginBottom:18}}>
            <div style={{fontFamily:FONT,fontWeight:700,fontSize:14,color:C.text,marginBottom:14}}>Créer une promotion</div>
            {[{k:"title",l:"Titre",p:"ex: Happy Hour"},{k:"discount",l:"Remise",p:"ex: −30% ou Gratuit"},{k:"desc",l:"Description",p:"Détail de l'offre"}].map(f=>(
              <div key={f.k} style={{marginBottom:10}}>
                <label style={{fontFamily:FONT,fontSize:12,fontWeight:600,color:C.textMuted,display:"block",marginBottom:4}}>{f.l}</label>
                <input style={iSt} placeholder={f.p} value={newPromo[f.k]} onChange={e=>setNewPromo({...newPromo,[f.k]:e.target.value})}/>
              </div>
            ))}
            <Btn variant="orange" onClick={addPromo} style={{marginTop:6}}>Publier la promotion</Btn>
          </div>
          {commerce.promos.map(p=>(
            <div key={p.id} style={{padding:"13px 16px",background:C.bg,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:9,display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:44,height:44,borderRadius:10,background:C.orangePale,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontFamily:FONTS,fontWeight:800,fontSize:11,color:C.orange,textAlign:"center",lineHeight:1}}>{p.discount}</span>
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:FONT,fontWeight:700,fontSize:13,color:C.text}}>{p.title}</div>
                <div style={{fontFamily:FONT,fontSize:12,color:C.textSoft}}>{p.desc}</div>
              </div>
              <Btn size="sm" variant="danger" onClick={()=>setCommerces(prev=>prev.map(c=>c.id===commerce.id?{...c,promos:c.promos.filter(pr=>pr.id!==p.id)}:c))}>Supprimer</Btn>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── FAQ PAGE ─────────────────────────────────────────────────────────────
const FAQ_DATA = [
  {cat:"🙋 Général",items:[
    {q:"C'est quoi Akoté ?",a:"Akoté centralise tous les commerces de proximité de votre ville. Horaires, contacts, avis, promotions et prise de rendez-vous — tout au même endroit, gratuit pour les habitants."},
    {q:"L'application est-elle gratuite ?",a:"Oui, totalement gratuit pour les habitants. Seuls les rendez-vous payants impliquent un acompte + 1,19€ de frais de service."},
    {q:"Comment ajouter Akoté sur mon téléphone ?",a:"Depuis Safari, appuyez sur Partager → « Sur l'écran d'accueil ». Une app native iOS & Android est en cours de développement."},
  ]},
  {cat:"🏪 Commerçants",items:[
    {q:"Comment inscrire mon commerce ?",a:"Créez un compte commerçant, remplissez votre fiche (nom, adresse, horaires) et attendez la validation sous 24-48h. C'est gratuit."},
    {q:"Comment modifier mon profil ?",a:"Connectez-vous avec votre compte commerçant → Tableau de bord → onglet Profil. Les modifications sont visibles immédiatement."},
    {q:"Comment créer une promotion ?",a:"Tableau de bord → Promotions → Créer une promotion. Elle apparaît immédiatement dans la page Bons plans."},
  ]},
  {cat:"📅 Rendez-vous",items:[
    {q:"Comment fonctionne l'acompte ?",a:"Vous payez un acompte défini par le commerçant (10%, 20%... ou montant fixe) + 1,19€ de frais de service Akoté. Le reste se règle sur place."},
    {q:"Que se passe-t-il si j'annule ?",a:"L'acompte est gelé : 50% pour Akoté + 50% pour le commerce. Les frais de service ne sont pas remboursés."},
    {q:"C'est quoi le QR code ?",a:"Un QR code unique est généré à chaque RDV. Il s'active 15 min avant votre créneau. Présentez-le au commerce à votre arrivée pour valider la présence."},
  ]},
  {cat:"⭐ Avis",items:[
    {q:"Comment laisser un avis ?",a:"Ouvrez la fiche du commerce → onglet Avis → rédigez votre commentaire et choisissez une note de 1 à 5 étoiles."},
    {q:"Peut-on supprimer un avis ?",a:"Vous pouvez supprimer votre propre avis. Akoté peut supprimer un avis qui viole nos conditions (injures, spam...)."},
  ]},
  {cat:"🔒 Compte",items:[
    {q:"Comment supprimer mon compte ?",a:"Paramètres → Mon compte → Supprimer. Données effacées sous 30 jours (RGPD)."},
    {q:"J'ai oublié mon mot de passe.",a:"Page de connexion → « Mot de passe oublié » → entrez votre email. Lien de réinitialisation envoyé en 5 min (vérifiez vos spams)."},
  ]},
];

function FAQPage() {
  const [cat,setCat] = useState("🙋 Général");
  const [open,setOpen] = useState(null);
  const [search,setSearch] = useState("");
  const all = FAQ_DATA.flatMap(c=>c.items.map(i=>({...i,cat:c.cat})));
  const filtered = search.trim() ? all.filter(i=>i.q.toLowerCase().includes(search.toLowerCase())||i.a.toLowerCase().includes(search.toLowerCase())) : null;

  return (
    <div style={{maxWidth:860,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{marginBottom:28}}>
        <div style={{fontFamily:FONTS,fontWeight:800,fontSize:28,color:C.text,letterSpacing:"-0.5px",marginBottom:4}}>❓ Foire aux questions</div>
        <p style={{fontFamily:FONT,fontSize:14,color:C.textSoft,marginBottom:18}}>Trouvez rapidement une réponse à votre question.</p>
        <div style={{position:"relative",maxWidth:480}}>
          <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:15,color:C.textMuted}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher dans la FAQ..."
            style={{width:"100%",padding:"11px 14px 11px 42px",borderRadius:12,border:`1.5px solid ${C.border}`,fontFamily:FONT,fontSize:14,color:C.text,outline:"none",boxSizing:"border-box",boxShadow:C.shadow}}/>
        </div>
      </div>

      {filtered ? (
        <div>
          <div style={{fontFamily:FONT,fontSize:13,color:C.textMuted,marginBottom:14}}>{filtered.length} résultat(s)</div>
          {filtered.length===0
            ? <div style={{padding:"40px",textAlign:"center",color:C.textMuted,fontFamily:FONT}}>Aucun résultat. Essayez d'autres mots.</div>
            : filtered.map((item,i)=>(
              <QItem key={i} item={item} open={open===`s${i}`} setOpen={()=>setOpen(open===`s${i}`?null:`s${i}`)} showCat/>
            ))
          }
        </div>
      ) : (
        <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
          <div style={{width:190,flexShrink:0}}>
            <div style={{background:C.bg,borderRadius:14,border:`1px solid ${C.border}`,overflow:"hidden"}}>
              {FAQ_DATA.map(c=>(
                <button key={c.cat} onClick={()=>setCat(c.cat)} style={{
                  width:"100%",textAlign:"left",padding:"11px 16px",background:cat===c.cat?C.greenPale:"transparent",
                  border:"none",borderLeft:`3px solid ${cat===c.cat?C.green:"transparent"}`,
                  borderBottom:`1px solid ${C.border}`,cursor:"pointer",
                  fontFamily:FONT,fontWeight:600,fontSize:13,color:cat===c.cat?C.green:C.textSoft,transition:"all .15s",
                }}>{c.cat}</button>
              ))}
            </div>
          </div>
          <div style={{flex:1}}>
            {FAQ_DATA.filter(c=>c.cat===cat)[0]?.items.map((item,i)=>(
              <QItem key={i} item={item} open={open===`${cat}${i}`} setOpen={()=>setOpen(open===`${cat}${i}`?null:`${cat}${i}`)}/>
            ))}
          </div>
        </div>
      )}
      <div style={{marginTop:28,padding:"18px 22px",background:C.orangePale,border:`1px solid ${C.orangeMid}`,borderRadius:14,display:"flex",justifyContent:"space-between",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <div>
          <div style={{fontFamily:FONT,fontWeight:700,fontSize:15,color:C.orange}}>Pas trouvé votre réponse ?</div>
          <div style={{fontFamily:FONT,fontSize:13,color:C.textSoft,marginTop:2}}>Notre équipe répond sous 24h.</div>
        </div>
        <Btn variant="orange">✉️ Nous contacter</Btn>
      </div>
    </div>
  );
}

function QItem({ item, open, setOpen, showCat=false }) {
  return (
    <div style={{background:C.bg,borderRadius:12,border:`1.5px solid ${open?C.green:C.border}`,marginBottom:8,overflow:"hidden",transition:"border .15s"}}>
      <button onClick={setOpen} style={{width:"100%",textAlign:"left",padding:"14px 18px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
        <div>
          {showCat && <div style={{fontFamily:FONT,fontSize:11,color:C.textMuted,marginBottom:2}}>{item.cat}</div>}
          <span style={{fontFamily:FONT,fontWeight:700,fontSize:14,color:C.text}}>{item.q}</span>
        </div>
        <div style={{width:26,height:26,borderRadius:"50%",background:open?C.green:C.bgOff,color:open?"#fff":C.textMuted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,transition:"all .15s"}}>
          {open?"−":"+"}
        </div>
      </button>
      {open && (
        <div style={{padding:"0 18px 16px",borderTop:`1px solid ${C.border}`,paddingTop:12}}>
          <p style={{fontFamily:FONT,fontSize:14,color:C.textMid,lineHeight:1.7,margin:0}}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────
const SUJETS = [
  {v:"question",l:"❓ Question générale"},{v:"commerce",l:"🏪 Inscrire mon commerce"},
  {v:"rdv",l:"📅 Problème de rendez-vous"},{v:"acompte",l:"💰 Litige / remboursement"},
  {v:"technique",l:"🔧 Problème technique"},{v:"partenariat",l:"🤝 Partenariat"},
  {v:"autre",l:"💬 Autre"},
];

function ContactPage({ user }) {
  const [form,setForm] = useState({sujet:"question",nom:user?.name||"",email:"",objet:"",message:""});
  const [sent,setSent] = useState(false);
  const [errors,setErrors] = useState({});

  const validate = () => {
    const e={};
    if(!form.nom.trim()) e.nom="Requis";
    if(!form.email.includes("@")) e.email="Email invalide";
    if(!form.objet.trim()) e.objet="Requis";
    if(!form.message.trim()) e.message="Requis";
    setErrors(e); return Object.keys(e).length===0;
  };

  const iSt = (err) => ({width:"100%",padding:"11px 14px",borderRadius:10,border:`1.5px solid ${err?C.red:C.border}`,fontFamily:FONT,fontSize:14,color:C.text,background:C.bg,outline:"none",boxSizing:"border-box"});

  if(sent) return (
    <div style={{maxWidth:520,margin:"60px auto",padding:"0 20px",textAlign:"center"}}>
      <div style={{fontSize:52,marginBottom:16}}>✅</div>
      <div style={{fontFamily:FONTS,fontWeight:800,fontSize:26,color:C.text,marginBottom:8}}>Message envoyé !</div>
      <p style={{fontFamily:FONT,fontSize:15,color:C.textSoft,lineHeight:1.7,marginBottom:24}}>Merci <strong>{form.nom}</strong> ! Nous répondrons à <strong>{form.email}</strong> sous 24h ouvrées.</p>
      <div style={{background:C.greenPale,border:`1px solid #A7F3D0`,borderRadius:12,padding:"14px 18px",marginBottom:24,textAlign:"left"}}>
        <div style={{fontFamily:FONT,fontSize:13,fontWeight:700,color:C.greenDark,marginBottom:4}}>Récapitulatif</div>
        <div style={{fontFamily:FONT,fontSize:13,color:C.textSoft}}>Sujet : {SUJETS.find(s=>s.v===form.sujet)?.l}</div>
        <div style={{fontFamily:FONT,fontSize:13,color:C.textSoft}}>Objet : {form.objet}</div>
      </div>
      <Btn size="lg" style={{justifyContent:"center"}} onClick={()=>setSent(false)}>Envoyer un autre message</Btn>
    </div>
  );

  return (
    <div style={{maxWidth:960,margin:"0 auto",padding:"28px 20px"}}>
      <div style={{marginBottom:24}}>
        <div style={{fontFamily:FONTS,fontWeight:800,fontSize:28,color:C.text,letterSpacing:"-0.5px",marginBottom:4}}>✉️ Nous contacter</div>
        <p style={{fontFamily:FONT,fontSize:14,color:C.textSoft}}>Une question, un problème, une idée ? Réponse garantie sous 24h.</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:24,alignItems:"flex-start"}}>
        <div style={{background:C.bg,borderRadius:16,border:`1px solid ${C.border}`,padding:"26px 28px",boxShadow:C.shadow}}>
          <div style={{fontFamily:FONT,fontWeight:700,fontSize:16,color:C.text,marginBottom:20}}>Votre message</div>

          {/* Sujets */}
          <div style={{marginBottom:18}}>
            <label style={{fontFamily:FONT,fontSize:12,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:8}}>Sujet</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {SUJETS.map(s=>(
                <button key={s.v} onClick={()=>setForm({...form,sujet:s.v})} style={{
                  padding:"9px 12px",borderRadius:10,border:`1.5px solid ${form.sujet===s.v?C.green:C.border}`,
                  background:form.sujet===s.v?C.greenPale:"transparent",
                  color:form.sujet===s.v?C.green:C.text,
                  fontFamily:FONT,fontWeight:600,fontSize:12,cursor:"pointer",textAlign:"left",transition:"all .15s",
                }}>{s.l}</button>
              ))}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div>
              <label style={{fontFamily:FONT,fontSize:12,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Nom *</label>
              <input style={iSt(errors.nom)} placeholder="Marie Dupont" value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})}/>
              {errors.nom && <div style={{fontFamily:FONT,fontSize:11,color:C.red,marginTop:2}}>⚠ {errors.nom}</div>}
            </div>
            <div>
              <label style={{fontFamily:FONT,fontSize:12,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Email *</label>
              <input type="email" style={iSt(errors.email)} placeholder="marie@email.fr" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              {errors.email && <div style={{fontFamily:FONT,fontSize:11,color:C.red,marginTop:2}}>⚠ {errors.email}</div>}
            </div>
          </div>

          <div style={{marginBottom:12}}>
            <label style={{fontFamily:FONT,fontSize:12,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Objet *</label>
            <input style={iSt(errors.objet)} placeholder="Résumez votre demande" value={form.objet} onChange={e=>setForm({...form,objet:e.target.value})}/>
            {errors.objet && <div style={{fontFamily:FONT,fontSize:11,color:C.red,marginTop:2}}>⚠ {errors.objet}</div>}
          </div>

          <div style={{marginBottom:20}}>
            <label style={{fontFamily:FONT,fontSize:12,fontWeight:700,color:C.textMuted,textTransform:"uppercase",letterSpacing:.5,display:"block",marginBottom:5}}>Message *</label>
            <textarea style={{...iSt(errors.message),height:110,resize:"vertical"}} placeholder="Décrivez votre situation en détail..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
            {errors.message && <div style={{fontFamily:FONT,fontSize:11,color:C.red,marginTop:2}}>⚠ {errors.message}</div>}
          </div>

          <Btn size="lg" style={{width:"100%",justifyContent:"center"}} onClick={()=>{if(validate())setSent(true);}}>
            Envoyer le message 🚀
          </Btn>
          <div style={{fontFamily:FONT,fontSize:11,color:C.textMuted,textAlign:"center",marginTop:10}}>Politique de confidentialité respectée · RGPD</div>
        </div>

        {/* Sidebar infos */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[
            {icon:"⏱️",title:"Délai de réponse",desc:"Sous 24h ouvrées (lun–ven, 9h–18h)"},
            {icon:"📧",title:"Email direct",desc:"support@akote.fr pour les urgences"},
            {icon:"📍",title:"Zone active",desc:"Aubervilliers (93300) — autres villes bientôt"},
            {icon:"🏪",title:"Vous êtes commerçant ?",desc:"Sélectionnez « Inscrire mon commerce » dans le sujet."},
            {icon:"💰",title:"Litige ou remboursement ?",desc:"Munissez-vous de votre numéro de réservation."},
          ].map(info=>(
            <div key={info.title} style={{padding:"14px 16px",background:C.bg,borderRadius:12,border:`1px solid ${C.border}`,display:"flex",gap:12,alignItems:"flex-start",boxShadow:C.shadow}}>
              <span style={{fontSize:20,flexShrink:0}}>{info.icon}</span>
              <div>
                <div style={{fontFamily:FONT,fontWeight:700,fontSize:13,color:C.text,marginBottom:2}}>{info.title}</div>
                <div style={{fontFamily:FONT,fontSize:12,color:C.textSoft,lineHeight:1.5}}>{info.desc}</div>
              </div>
            </div>
          ))}
          <div style={{padding:"14px 16px",background:C.bg,borderRadius:12,border:`1px solid ${C.border}`}}>
            <div style={{fontFamily:FONT,fontWeight:700,fontSize:13,color:C.text,marginBottom:10}}>📱 Suivez-nous</div>
            <div style={{display:"flex",gap:8}}>
              {[{l:"Instagram",e:"📸"},{l:"Facebook",e:"👥"},{l:"TikTok",e:"🎵"}].map(r=>(
                <div key={r.l} style={{flex:1,padding:"8px",background:C.bgOff,borderRadius:9,border:`1px solid ${C.border}`,textAlign:"center",cursor:"pointer"}}>
                  <div style={{fontSize:18}}>{r.e}</div>
                  <div style={{fontFamily:FONT,fontSize:10,fontWeight:600,color:C.textMuted,marginTop:3}}>{r.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [ville,setVille]       = useState(null);
  const [user,setUser]         = useState(null);
  const [page,setPage]         = useState("home");
  const [commerces,setCommerces] = useState(COMMERCES_INIT);
  const [claims,setClaims]     = useState(CLAIMS_INIT);
  const [selCom,setSel]        = useState(null);
  const [claimPre,setClaimPre] = useState(null);
  const [favs,setFavs]         = useState([]);

  const togFav = id => setFavs(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const goTo   = c  => { setSel(c); setPage("detail"); };
  const toClaim= c  => { setClaimPre(c); setPage("claims"); };

  if(!ville) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700;800&display=swap');*{margin:0;padding:0;box-sizing:border-box;}`}</style>
      <VilleSelector onSelect={v=>setVille(v)}/>
    </>
  );
  if(!user) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700;800&display=swap');*{margin:0;padding:0;box-sizing:border-box;}`}</style>
      <AuthPage onLogin={u=>{setUser(u);setPage("home");}}/>
    </>
  );

  return (
    <div style={{fontFamily:FONT,background:C.bgOff,minHeight:"100vh",color:C.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600;700;800&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        button{transition:all .15s;} button:hover:not(:disabled){opacity:.87;}
        ::-webkit-scrollbar{width:5px;height:5px;} ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px;}
        input,textarea,select{transition:border .15s;} input:focus,textarea:focus,select:focus{border-color:${C.green}!important;}
      `}</style>
      <Nav page={page} setPage={p=>{setPage(p);setSel(null);}} user={user}
        onLogout={()=>{setUser(null);setVille(null);setPage("home");}}
        favorites={favs} ville={ville} onChangeVille={()=>{setVille(null);setUser(null);}}/>
      <main>
        {page==="home"   && <HomePage commerces={commerces} onSelect={goTo} favorites={favs} toggleFavorite={togFav} ville={ville}/>}
        {page==="promos" && <PromosPage commerces={commerces} onSelect={goTo}/>}
        {page==="map"    && <MapPage commerces={commerces} onSelect={goTo} ville={ville}/>}
        {page==="claims" && <ClaimsPage claims={claims} setClaims={setClaims} user={user} preselect={claimPre} setPreselect={setClaimPre}/>}
        {page==="faq"    && <FAQPage/>}
        {page==="contact"&& <ContactPage user={user}/>}
        {page==="dashboard" && user.role==="commerce" && <Dashboard commerces={commerces} user={user} setCommerces={setCommerces}/>}
        {page==="detail" && selCom && <CommerceDetail commerce={selCom} onBack={()=>setPage("home")} onClaim={toClaim} commerces={commerces} setCommerces={setCommerces} favorites={favs} toggleFavorite={togFav} user={user}/>}
      </main>
    </div>
  );
}
