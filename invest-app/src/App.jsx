import { useState, useEffect, useCallback, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const STOCKS_RAW = [
["1301","極洋"],["1332","日本水産"],["1333","マルハニチロ"],["1721","コムシスHD"],["1801","大成建設"],["1802","大林組"],["1803","清水建設"],["1812","鹿島建設"],["1925","大和ハウス工業"],["1928","積水ハウス"],["1963","日揮HD"],
["2002","日清製粉G"],["2267","ヤクルト本社"],["2269","明治HD"],["2282","日本ハム"],["2432","DeNA"],["2501","サッポロHD"],["2502","アサヒグループHD"],["2503","キリンHD"],["2651","ローソン"],["2702","日本マクドナルドHD"],["2768","双日"],["2801","キッコーマン"],["2802","味の素"],["2897","日清食品HD"],["2980","SREホールディングス"],
["3086","J.フロントリテイリング"],["3099","三越伊勢丹HD"],["3382","セブン&アイHD"],["3401","帝人"],["3402","東レ"],["3407","旭化成"],["3465","ケイアイスター不動産"],["3491","GA technologies"],["3659","ネクソン"],["3697","SHIFT"],["3765","ガンホー・オンライン・エンターテイメント"],["3769","GMOペイメントゲートウェイ"],["3774","インターネットイニシアティブ"],["3861","王子HD"],["3923","ラクス"],
["4004","レゾナック・HD"],["4005","住友化学"],["4021","日産化学"],["4042","東ソー"],["4061","デンカ"],["4062","イビデン"],["4063","信越化学工業"],["4114","日本触媒"],["4151","協和キリン"],["4165","プレイド"],["4183","三井化学"],["4185","JSR"],["4188","三菱ケミカルG"],["4385","メルカリ"],["4424","Appier Group"],["4452","花王"],["4478","freee"],["4479","マネーフォワード"],["4493","サイバーセキュリティクラウド"],["4502","武田薬品工業"],["4503","アステラス製薬"],["4506","住友ファーマ"],["4507","塩野義製薬"],["4519","中外製薬"],["4523","エーザイ"],["4543","テルモ"],["4568","第一三共"],["4578","大塚HD"],["4587","ペプチドリーム"],["4661","オリエンタルランド"],["4689","LINEヤフー"],["4755","楽天グループ"],["4812","電通国際情報サービス"],["4901","富士フイルムHD"],["4911","資生堂"],
["5019","出光興産"],["5020","ENEOSホールディングス"],["5101","横浜ゴム"],["5108","ブリヂストン"],["5201","AGC"],["5214","日本電気硝子"],["5301","東海カーボン"],["5401","日本製鉄"],["5406","神戸製鋼所"],["5411","JFEホールディングス"],["5444","大和工業"],["5713","住友金属鉱山"],["5714","DOWAホールディングス"],["5801","古河電気工業"],["5802","住友電気工業"],["5803","フジクラ"],
["6098","リクルートHD"],["6103","オークマ"],["6113","アマダ"],["6141","DMG森精機"],["6146","ディスコ"],["6301","小松製作所"],["6302","住友重機械工業"],["6305","日立建機"],["6326","クボタ"],["6361","荏原製作所"],["6367","ダイキン工業"],["6383","ダイフク"],["6471","日本精工"],["6501","日立製作所"],["6503","三菱電機"],["6504","富士電機"],["6506","安川電機"],["6526","ソシオネクスト"],["6594","ニデック"],["6645","オムロン"],["6702","富士通"],["6723","ルネサスエレクトロニクス"],["6724","セイコーエプソン"],["6752","パナソニックHD"],["6753","シャープ"],["6758","ソニーグループ"],["6762","TDK"],["6770","アルプスアルパイン"],["6857","アドバンテスト"],["6861","キーエンス"],["6902","デンソー"],["6920","レーザーテック"],["6954","ファナック"],["6963","ローム"],["6976","太陽誘電"],
["7181","かんぽ生命保険"],["7182","ゆうちょ銀行"],["7201","日産自動車"],["7202","いすゞ自動車"],["7203","トヨタ自動車"],["7205","日野自動車"],["7211","三菱自動車工業"],["7261","マツダ"],["7267","本田技研工業"],["7269","スズキ"],["7270","SUBARU"],["7272","ヤマハ発動機"],["7731","ニコン"],["7733","オリンパス"],["7735","スクリーンHD"],["7741","HOYA"],["7751","キヤノン"],["7752","リコー"],["7832","バンダイナムコHD"],["7974","任天堂"],
["8001","伊藤忠商事"],["8002","丸紅"],["8015","豊田通商"],["8028","ファミリーマート"],["8031","三井物産"],["8035","東京エレクトロン"],["8053","住友商事"],["8058","三菱商事"],["8267","イオン"],["8306","三菱UFJフィナンシャルG"],["8308","りそなHD"],["8309","三井住友トラストHD"],["8316","三井住友フィナンシャルG"],["8354","ふくおかフィナンシャルG"],["8411","みずほフィナンシャルG"],["8601","大和証券G本社"],["8604","野村HD"],["8630","SOMPOホールディングス"],["8725","MS&ADインシュアランスG"],["8750","第一生命HD"],["8766","東京海上HD"],["8801","三井不動産"],["8802","三菱地所"],["8804","東京建物"],["8830","住友不動産"],
["9020","JR東日本"],["9021","JR西日本"],["9022","JR東海"],["9064","ヤマトHD"],["9101","日本郵船"],["9104","商船三井"],["9107","川崎汽船"],["9201","日本航空(JAL)"],["9202","ANAホールディングス"],["9432","NTT"],["9433","KDDI"],["9434","ソフトバンク"],["9501","東京電力HD"],["9502","中部電力"],["9503","関西電力"],["9602","東宝"],["9613","NTTデータグループ"],["9684","スクウェア・エニックスHD"],["9697","カプコン"],["9699","コーエーテクモHD"],["9766","コナミグループ"],["9984","ソフトバンクグループ"],
["166A","タスキホールディングス"],["2153","E・Jホールディングス"],["3696","セレス"],["4208","UBE"],["6472","NTN"],["6473","ジェイテクト"],
];
const TSE_STOCKS = STOCKS_RAW.map(([code,name])=>({code,name}));

const INDICATORS = [
  {key:"PER",label:"PER",desc:"株価収益率",unit:"倍",cat:"バリュエーション"},
  {key:"PBR",label:"PBR",desc:"株価純資産倍率",unit:"倍",cat:"バリュエーション"},
  {key:"PSR",label:"PSR",desc:"株価売上高倍率",unit:"倍",cat:"バリュエーション"},
  {key:"EV_EB",label:"EV/EBITDA",desc:"",unit:"倍",cat:"バリュエーション"},
  {key:"yield",label:"配当利回り",desc:"",unit:"%",cat:"バリュエーション"},
  {key:"sg",label:"売上成長率",desc:"YoY",unit:"%",cat:"成長性"},
  {key:"opg",label:"営業利益成長率",desc:"YoY",unit:"%",cat:"成長性"},
  {key:"npg",label:"純利益成長率",desc:"YoY",unit:"%",cat:"成長性"},
  {key:"epsg",label:"EPS成長率",desc:"YoY",unit:"%",cat:"成長性"},
  {key:"opm",label:"営業利益率",desc:"",unit:"%",cat:"収益性"},
  {key:"npm",label:"純利益率",desc:"",unit:"%",cat:"収益性"},
  {key:"ROE",label:"ROE",desc:"自己資本利益率",unit:"%",cat:"収益性"},
  {key:"ROA",label:"ROA",desc:"総資産利益率",unit:"%",cat:"収益性"},
  {key:"ROIC",label:"ROIC",desc:"投下資本利益率",unit:"%",cat:"収益性"},
  {key:"gpm",label:"粗利益率",desc:"",unit:"%",cat:"収益性"},
  {key:"eqr",label:"自己資本比率",desc:"",unit:"%",cat:"財務健全性"},
  {key:"cratio",label:"流動比率",desc:"",unit:"%",cat:"財務健全性"},
  {key:"debitda",label:"有利子負債/EBITDA",desc:"ネット",unit:"倍",cat:"財務健全性"},
  {key:"de",label:"D/Eレシオ",desc:"",unit:"倍",cat:"財務健全性"},
  {key:"mktcap",label:"時価総額",desc:"",unit:"億円",cat:"規模・その他"},
  {key:"mown",label:"経営者保有比率",desc:"",unit:"%",cat:"規模・その他"},
  {key:"opcf",label:"営業CF",desc:"",unit:"億円",cat:"規模・その他"},
  {key:"fcf",label:"フリーCF",desc:"",unit:"億円",cat:"規模・その他"},
  {key:"sales",label:"売上高",desc:"直近期",unit:"億円",cat:"規模・その他"},
];
const IND_CATS=[...new Set(INDICATORS.map(i=>i.cat))];

const ENTRY_STEPS=[
  {key:"stock",type:"stockSearch",q:"銘柄を検索してください",hint:"証券コードまたは銘柄名で検索",req:true},
  {key:"entryDate",type:"date",q:"エントリー日は？",hint:null,req:true},
  {key:"entryPrice",type:"number",q:"エントリー株価は？（円）",hint:"現在値でもOK",req:true,ph:"例: 3250"},
  {key:"shares",type:"number",q:"購入株数は？",hint:null,req:false,ph:"例: 100"},
  {key:"technical",type:"textarea",q:"テクニカルの根拠は？",hint:"一目均衡表の状況、移動平均、新高値など",req:true,ph:"例: 週足で雲上抜け。転換線が基準線を上回り遅行線も実線上。新高値更新中。"},
  {key:"fundamental",type:"fundamentals",q:"ファンダメンタルの根拠は？",hint:"指標を選んで数値を入力（スキップ可）",req:false},
  {key:"bullScenario",type:"bullScenario",q:"強気シナリオを描いてください",hint:"一目計算値とシナリオ詳細を記入",req:true},
  {key:"bearScenario",type:"textarea",q:"弱気・撤退条件は？",hint:"どうなったらシナリオ崩れと判断するか",req:true,ph:"例: 雲の中に戻ったら撤退。決算で営業利益が前年割れなら即売り。"},
  {key:"macro",type:"textarea",q:"マクロ環境のメモ",hint:"金利、為替、セクタートレンドなど",req:false,ph:"例: 日銀利上げ警戒中だが内需なので影響限定的。"},
  {key:"stopLoss",type:"number",q:"損切りラインは何円？",hint:"これを下回ったら迷わず売る価格",req:true,ph:"例: 2900"},
  {key:"takeProfit",type:"number",q:"利確目標は何円？",hint:"まず狙う売り目標価格",req:true,ph:"例: 4200"},
];
const EXIT_STEPS=[
  {key:"exitDate",type:"date",q:"売却日は？",req:true},
  {key:"exitPrice",type:"number",q:"売却株価は？（円）",req:true,ph:"例: 3800"},
  {key:"exitShares",type:"number",q:"売却株数は？",hint:"分割売却の場合は売る株数だけ入力",req:true,ph:"例: 100"},
  {key:"exitReason",type:"select",q:"売却理由を選んでください",req:true,options:[
    {v:"stopLoss",l:"損切りライン到達"},{v:"takeProfit",l:"利確目標到達"},
    {v:"scenarioBreaker",l:"シナリオ崩れ"},{v:"other",l:"その他"},
  ]},
  {key:"comparison",type:"textarea",q:"予測と結果を比較してください",req:true,hint:"何が合っていて、何が外れましたか？",ph:"例: 強気シナリオ通り決算は良かったが、マクロ悪化で予想外に売り込まれた。"},
  {key:"lessons",type:"textarea",q:"次回への改善点・学びは？",req:true,hint:"同じ失敗を繰り返さないためのメモ",ph:"例: 決算前に半分利確する。マクロリスクをもっと重視する。"},
];


// ─── localStorage ────────────────────────────────────────
const NOTES_KEY='invest-notes-v2';
const LEARN_KEY='invest-learn-v1';
async function dbLoad(){
  try{
    const n=localStorage.getItem(NOTES_KEY);
    const l=localStorage.getItem(LEARN_KEY);
    return{notes:n?JSON.parse(n):[],learn:l?JSON.parse(l):null};
  }catch{return{notes:[],learn:null};}
}
async function dbSaveNotes(_,notes){
  try{localStorage.setItem(NOTES_KEY,JSON.stringify(notes));}catch(e){}
}
async function dbSaveLearn(_,learn){
  try{localStorage.setItem(LEARN_KEY,JSON.stringify(learn));}catch(e){}
}

// ─── 旧フォーマット→新フォーマット移行 ─────────────────────
function migrateNoteV2(note){
  if(note.buys!==undefined)return note;
  const buys=note.entry?.price?[{id:uid(),date:note.entry.date,price:note.entry.price,shares:Number(note.entry.shares)||0}]:[];
  const sells=note.exit?[{id:uid(),date:note.exit.date,price:note.exit.price,shares:Number(note.entry?.shares)||0,reason:note.exit.reason||'',comparison:note.exit.comparison||'',lessons:note.exit.lessons||''}]:[];
  return{...note,buys,sells,
    entry:{technical:note.entry?.technical||'',fundamental:note.entry?.fundamental||null,bullScenario:note.entry?.bullScenario||null,bearScenario:note.entry?.bearScenario||'',macro:note.entry?.macro||''},
    holding:note.holding||{stopLoss:null,takeProfit:null,scenarioBreaker:'',logs:[]}};
}
function calcRemaining(note){
  const b=(note.buys||[]).reduce((s,x)=>s+(Number(x.shares)||0),0);
  const sv=(note.sells||[]).reduce((s,x)=>s+(Number(x.shares)||0),0);
  return Math.max(0,b-sv);
}
function calcAvgBuyPrice(note){
  const buys=note.buys||[];
  const amt=buys.reduce((s,b)=>s+(b.price*(Number(b.shares)||0)),0);
  const sh=buys.reduce((s,b)=>s+(Number(b.shares)||0),0);
  return sh?Math.round(amt/sh):0;
}

function migrateLearn(d){
  if(!d)return null;
  if(d.notes&&d.memos)return d;
  if(d.pages){
    const notes=[],memos=[];
    d.pages.forEach(p=>{
      const noteId=uid();
      notes.push({id:noteId,sectionId:p.sectionId,title:p.type==="flashcard"?(p.front||"(無題)"):(p.title||"(無題)"),pinned:p.pinned||false,createdAt:p.createdAt,updatedAt:p.updatedAt});
      const content=p.type==="flashcard"?`${p.front||""}\n\n${p.back||""}`.trim():(p.body||"");
      if(content)memos.push({id:uid(),noteId,content,createdAt:p.createdAt});
    });
    return{sections:d.sections,notes,memos};
  }
  return{sections:d.sections||[],notes:d.notes||[],memos:d.memos||[]};
}
async function loadLearn(){ return migrateLearn(null); }

const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const todayStr=()=>new Date().toISOString().slice(0,10);
const fmt=(d)=>d?d.replace(/-/g,"/"):"—";
const fmtP=(p)=>(p||p===0)?Number(p).toLocaleString()+"円":"—";
const pnlRate=(a,b)=>a&&b?((b-a)/a*100).toFixed(1):null;
const EXIT_REASON={stopLoss:"損切りライン到達",takeProfit:"利確目標到達",scenarioBreaker:"シナリオ崩れ",other:"その他"};

function getCanNext(step,data){
  if(!step.req)return true;
  const val=data[step.key];
  if(step.type==="stockSearch")return!!(val?.ticker&&val?.name);
  if(step.type==="fundamentals")return true;
  if(step.type==="bullScenario")return!!(val?.freeText?.trim());
  if(step.type==="textarea"||step.type==="text")return!!(val&&String(val).trim());
  if(step.type==="number")return!!(val||val===0);
  return!!val;
}

function fundamentalToMd(d){
  if(!d)return"—";if(typeof d==="string")return d;
  const rows=Object.entries(d.selected||{}).map(([k,v])=>{const ind=INDICATORS.find(i=>i.key===k);return ind?`- ${ind.label}: **${v}** ${ind.unit}`:""}).filter(Boolean);
  if(d.other)rows.push(`- その他: ${d.other}`);
  return rows.join("\n")||"—";
}
function bullScenarioToMd(d){
  if(!d)return"—";if(typeof d==="string")return d;
  const A=parseFloat(d.A)||0,B=parseFloat(d.B)||0,C=parseFloat(d.C)||0;
  const lines=[];
  if(B){lines.push(`【一目計算値】A=${A}円 B=${B}円 C=${C}円`);if(B&&C)lines.push(`- V: ${Math.round(2*B-C).toLocaleString()}円`);if(A&&B&&C)lines.push(`- N: ${Math.round(C+(B-A)).toLocaleString()}円`);if(A&&B)lines.push(`- E: ${Math.round(2*B-A).toLocaleString()}円`);if(d.targetType)lines.push(`- 採用: ${d.targetType}計算値`);lines.push("");}
  if(d.freeText)lines.push(d.freeText);
  return lines.join("\n")||"—";
}
function toMarkdown(n){
  const rate=pnlRate(n.entry?.price,n.exit?.price);
  return[
    `# ${n.name}（${n.ticker}）`,"",
    `**ステータス**: ${STATUS[n.status]?.label}　**作成日**: ${fmt(n.createdAt?.slice(0,10))}`,"",
    "## エントリー情報",`| 日付 | 株価 | 株数 |`,`|------|------|------|`,
    `| ${fmt(n.entry?.date)} | ${fmtP(n.entry?.price)} | ${n.entry?.shares?n.entry.shares+"株":"—"} |`,"",
    "## テクニカル根拠",n.entry?.technical||"—","",
    "## ファンダメンタル根拠",fundamentalToMd(n.entry?.fundamental),"",
    "## 強気シナリオ",bullScenarioToMd(n.entry?.bullScenario),"",
    "## 弱気・撤退条件",n.entry?.bearScenario||"—","",
    "## マクロ環境",n.entry?.macro||"—","",
    "## 保有管理",`- 損切り: ${fmtP(n.holding?.stopLoss)}`,`- 利確: ${fmtP(n.holding?.takeProfit)}`,`- シナリオ崩れ条件: ${n.holding?.scenarioBreaker||"—"}`,"",
    ...(n.holding?.logs?.length?["## 保有ログ",...n.holding.logs.flatMap(l=>[`### ${fmt(l.date)}`,l.memo,""])]:[] ),
    ...(n.exit?[
      "## 売却記録",`| 売却日 | 株価 | 損益率 | 理由 |`,`|--------|------|--------|------|`,
      `| ${fmt(n.exit.date)} | ${fmtP(n.exit.price)} | ${rate?(parseFloat(rate)>0?"+":"")+rate+"%":"—"} | ${EXIT_REASON[n.exit.reason]||n.exit.reason} |`,"",
      "## 振り返り：予測 vs 結果",n.exit.comparison||"—","",
      "## 次回への改善点",n.exit.lessons||"—",
    ]:[]),
  ].join("\n");
}

const C={
  bg:        "#f5eeda",   // 古紙・羊皮紙
  surface:   "#fdf8f0",   // 白い紙面
  surfaceEl: "#ece4d0",   // 少し影のついた紙
  border:    "#d5c4a0",   // 紙のエッジ
  text:      "#1e1208",   // 濃いセピアインク
  textSub:   "#7a5c38",   // ミッドセピア
  textMuted: "#b09878",   // 薄れたインク
  blue:      "#3d6591",   // インクブルー
  green:     "#4a7a42",   // フォレストグリーン
  amber:     "#a86018",   // アンバーインク
  red:       "#963a24",   // 赤インク
};
const STATUS={watching:{label:"保有中",color:"#4a7a42"},holding:{label:"保有中",color:"#4a7a42"},exited:{label:"売却済",color:"#7a5c38"}};
const mono={fontFamily:"'SF Mono','Fira Code','Consolas',monospace"};
const serif="'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif";
const scr={minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif",maxWidth:480,margin:"0 auto",paddingBottom:88,animation:"slideIn .28s cubic-bezier(.32,.72,0,1)"};
const hdr={padding:"14px 20px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10,background:"rgba(245,238,218,0.92)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",position:"sticky",top:0,zIndex:10};
const inp={width:"100%",background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"11px 13px",color:C.text,fontSize:16,boxSizing:"border-box",outline:"none",fontFamily:"inherit",boxShadow:"inset 0 1px 3px rgba(100,70,30,0.07)"};
const ta={...inp,resize:"vertical",minHeight:96,fontSize:14,lineHeight:1.7};
const btn=(bg,fg)=>({display:"block",width:"100%",padding:"13px 18px",borderRadius:8,border:bg==="ghost"?`1.5px solid ${C.border}`:"none",background:bg==="ghost"?C.surface:bg,color:bg==="ghost"?C.textSub:fg||"#fdf8f0",fontSize:15,fontWeight:600,cursor:"pointer",textAlign:"center",transition:"opacity .12s",letterSpacing:"0.02em"});
const badge=(s)=>({display:"inline-flex",alignItems:"center",padding:"1px 8px",border:`1.5px solid ${STATUS[s]?.color||C.textSub}`,borderRadius:3,fontSize:10,fontWeight:700,color:STATUS[s]?.color||C.textSub,letterSpacing:"0.07em",textTransform:"uppercase",background:"transparent"});
const fab={position:"fixed",bottom:80,right:20,width:54,height:54,borderRadius:27,background:"linear-gradient(135deg,#b8701e,#9a5610)",border:"none",color:"#fdf8f0",fontSize:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(150,80,20,0.35), 0 1px 4px rgba(100,50,10,0.2)",zIndex:100};
const bkBtn={background:"none",border:`1.5px solid ${C.border}`,borderRadius:6,color:C.textSub,fontSize:13,cursor:"pointer",padding:"5px 10px",fontWeight:600};
const paperCard={background:C.surface,borderRadius:10,padding:"14px 16px",marginBottom:10,boxShadow:"0 2px 8px rgba(80,50,20,0.09), 0 1px 2px rgba(80,50,20,0.06)",border:`1px solid ${C.border}`};

const SEC_PALETTE=["#3d6591","#4a7a42","#a86018","#963a24","#7a5878","#2e7a80","#8a6018","#4a7a62"];
const DEFAULT_SECTIONS=[
  {id:"s_tech", name:"テクニカル分析",       color:"#3d6591"},
  {id:"s_funda",name:"ファンダメンタル分析", color:"#4a7a42"},
  {id:"s_psy",  name:"投資心理・規律",       color:"#a86018"},
  {id:"s_fail", name:"失敗から学ぶ",         color:"#963a24"},
  {id:"s_term", name:"用語・知識",           color:"#7a5878"},
];

// ── Stock Search ──────────────────────────────────────────
function StockSearchInput({value,onChange}){
  const [query,setQuery]=useState("");
  const [open,setOpen]=useState(false);
  const [manual,setManual]=useState(false);
  const [sugs,setSugs]=useState([]);
  const ref=useRef(null);
  useEffect(()=>{const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  useEffect(()=>{if(!query.trim()){setSugs([]);setOpen(false);return;}const q=query.replace(/\s/g,"").toLowerCase();const res=TSE_STOCKS.filter(s=>s.code.toLowerCase().startsWith(q)||s.name.toLowerCase().includes(q)).slice(0,8);setSugs(res);setOpen(res.length>0);},[query]);
  const select=(s)=>{onChange({ticker:s.code,name:s.name});setQuery("");setOpen(false);};
  const clear=()=>{onChange({ticker:"",name:""});setQuery("");};
  if(manual)return(
    <div>
      <button onClick={()=>setManual(false)} style={{background:"none",border:"none",color:C.blue,fontSize:13,cursor:"pointer",marginBottom:16,padding:0}}>← 検索に戻る</button>
      <div style={{marginBottom:12}}><div style={{fontSize:12,color:C.textSub,fontWeight:600,marginBottom:6}}>証券コード</div><input style={inp} value={value.ticker||""} onChange={e=>onChange({...value,ticker:e.target.value})} placeholder="例: 7203" autoFocus/></div>
      <div><div style={{fontSize:12,color:C.textSub,fontWeight:600,marginBottom:6}}>銘柄名</div><input style={inp} value={value.name||""} onChange={e=>onChange({...value,name:e.target.value})} placeholder="例: トヨタ自動車"/></div>
    </div>
  );
  return(
    <div ref={ref}>
      {value.ticker&&value.name?(
        <div style={{background:C.blue+"18",border:`1px solid ${C.blue}40`,borderRadius:10,padding:"13px 15px",display:"flex",gap:10,alignItems:"center"}}>
          <span style={{...mono,fontSize:14,color:C.blue,fontWeight:700}}>{value.ticker}</span>
          <span style={{fontSize:16,fontWeight:700,color:C.text,flex:1}}>{value.name}</span>
          <button onClick={clear} style={{background:"none",border:"none",color:C.textSub,cursor:"pointer",fontSize:18,padding:0}}>✕</button>
        </div>
      ):(
        <>
          <div style={{position:"relative"}}>
            <input style={{...inp,paddingLeft:38}} value={query} onChange={e=>setQuery(e.target.value)} placeholder="コードまたは銘柄名で検索" onFocus={()=>sugs.length>0&&setOpen(true)} autoFocus/>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:C.textSub,fontSize:15}}>🔍</span>
            {open&&(
              <div style={{position:"absolute",top:"100%",left:0,right:0,background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:"0 0 10px 10px",zIndex:50,maxHeight:270,overflowY:"auto",boxShadow:"0 8px 24px rgba(0,0,0,0.4)"}}>
                {sugs.map(s=>(
                  <div key={s.code} onClick={()=>select(s)} style={{padding:"11px 14px",cursor:"pointer",display:"flex",gap:10,alignItems:"center",borderBottom:`1px solid ${C.border}40`}}>
                    <span style={{...mono,fontSize:13,color:C.blue,fontWeight:700,minWidth:44}}>{s.code}</span>
                    <span style={{fontSize:14,color:C.text}}>{s.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={()=>setManual(true)} style={{background:"none",border:"none",color:C.textSub,fontSize:12,cursor:"pointer",marginTop:10,padding:0,textDecoration:"underline"}}>リストにない場合は手動入力</button>
        </>
      )}
    </div>
  );
}

// ── Fundamentals Input ────────────────────────────────────
function FundamentalsInput({value,onChange}){
  const sel=value.selected||{};
  const other=value.other||"";
  const toggle=(ind)=>{const upd={...sel};if(upd[ind.key]!==undefined)delete upd[ind.key];else upd[ind.key]="";onChange({...value,selected:upd});};
  const setVal=(key,v)=>onChange({...value,selected:{...sel,[key]:v}});
  return(
    <div style={{maxHeight:"54vh",overflowY:"auto",paddingRight:2}}>
      {IND_CATS.map(cat=>{
        const inds=INDICATORS.filter(i=>i.cat===cat);
        const selInds=inds.filter(i=>sel[i.key]!==undefined);
        return(
          <div key={cat} style={{marginBottom:16}}>
            <div style={{fontSize:10,color:C.textSub,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:7}}>{cat}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:selInds.length?8:0}}>
              {inds.map(ind=>(<button key={ind.key} onClick={()=>toggle(ind)} style={{padding:"4px 11px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",border:`1.5px solid ${sel[ind.key]!==undefined?C.blue:C.border}`,background:sel[ind.key]!==undefined?C.blue+"20":C.surfaceEl,color:sel[ind.key]!==undefined?C.blue:C.textSub}}>{ind.label}{ind.desc?` (${ind.desc})`:""}</button>))}
            </div>
            {selInds.map(ind=>(<div key={ind.key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,paddingLeft:2}}><span style={{fontSize:12,color:C.blue,minWidth:100,fontWeight:600}}>{ind.label}</span><input style={{...inp,flex:1,padding:"6px 10px",fontSize:14}} value={sel[ind.key]} onChange={e=>setVal(ind.key,e.target.value)} type="text"/><span style={{fontSize:11,color:C.textSub,minWidth:26}}>{ind.unit}</span></div>))}
          </div>
        );
      })}
      <div style={{marginTop:4}}>
        <div style={{fontSize:10,color:C.textSub,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>その他・フリーメモ</div>
        <textarea style={{...ta,minHeight:70}} value={other} onChange={e=>onChange({...value,other:e.target.value})} placeholder="上記以外の指標や特記事項を自由に記入"/>
      </div>
    </div>
  );
}

// ── Bull Scenario Input ───────────────────────────────────
function BullScenarioInput({value,onChange}){
  const A=parseFloat(value.A)||0,B=parseFloat(value.B)||0,CC=parseFloat(value.C)||0;
  const vVal=B&&CC?2*B-CC:null,nVal=A&&B&&CC?CC+(B-A):null,eVal=A&&B?2*B-A:null;
  const calcs=[{key:"V",label:"V計算値",val:vVal,formula:"2B-C"},{key:"N",label:"N計算値",val:nVal,formula:"C+(B-A)"},{key:"E",label:"E計算値",val:eVal,formula:"2B-A"}];
  return(
    <div style={{maxHeight:"60vh",overflowY:"auto",paddingRight:2}}>
      <div style={{background:C.bg,borderRadius:10,padding:"13px 14px",marginBottom:14,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:12,color:C.blue,fontWeight:700,marginBottom:10}}>📐 一目計算値</div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          {[{k:"A",l:"起点安値A",c:C.red},{k:"B",l:"波高値B",c:C.green},{k:"C",l:"押し安値C",c:C.amber}].map(f=>(
            <div key={f.k} style={{flex:1}}><div style={{fontSize:10,color:f.c,fontWeight:700,marginBottom:4}}>{f.l}</div><input style={{...inp,padding:"8px 8px",fontSize:14,borderColor:f.c+"55",textAlign:"center"}} type="number" value={value[f.k]||""} onChange={e=>onChange({...value,[f.k]:e.target.value})} placeholder="円"/></div>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          {calcs.map(o=>{const sel=value.targetType===o.key;return(<div key={o.key} onClick={()=>onChange({...value,targetType:o.key})} style={{flex:1,borderRadius:9,padding:"9px 10px",cursor:"pointer",textAlign:"center",background:sel?C.green+"15":C.surfaceEl,border:`1.5px solid ${sel?C.green:C.border}`}}><div style={{fontSize:10,color:sel?C.green:C.textSub,fontWeight:700,marginBottom:3}}>{o.label}</div><div style={{...mono,fontSize:15,fontWeight:700,color:sel?C.green:o.val?C.text:C.textMuted}}>{o.val?Math.round(o.val).toLocaleString()+"円":"—"}</div><div style={{fontSize:9,color:C.textMuted,marginTop:2}}>{o.formula}</div></div>);})}
        </div>
      </div>
      <div style={{fontSize:10,color:C.textSub,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>シナリオ詳細・根拠 *</div>
      <textarea style={{...ta,minHeight:110}} value={value.freeText||""} onChange={e=>onChange({...value,freeText:e.target.value})} placeholder="例: 次の決算で増収増益が確認されれば機関投資家の買いが入り、N計算値の目標株価を目指す想定。" autoFocus={!value.A}/>
    </div>
  );
}

// ── Display Helpers ───────────────────────────────────────
function NoteBlock({label,value}){if(!value)return null;return(<div style={{marginBottom:13}}><div style={{fontSize:10,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>{label}</div><div style={{fontSize:14,color:C.text,lineHeight:1.75,background:C.bg,borderRadius:8,padding:"10px 12px",whiteSpace:"pre-wrap"}}>{value}</div></div>);}
function InfoRow({label,value:v,mc,color}){return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:9,gap:12}}><span style={{fontSize:12,color:C.textSub,minWidth:80,paddingTop:1}}>{label}</span><span style={{fontSize:14,color:color||C.text,textAlign:"right",flex:1,lineHeight:1.5,...(mc?mono:{})}}>{v||"—"}</span></div>);}
function FundamentalDisplay({data}){
  if(!data)return null;if(typeof data==="string")return <NoteBlock label="ファンダメンタル根拠" value={data}/>;
  const sel=data.selected||{};const keys=Object.keys(sel);
  if(!keys.length&&!data.other)return null;
  return(<div style={{marginBottom:13}}><div style={{fontSize:10,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:7}}>ファンダメンタル根拠</div>{keys.length>0&&(<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:data.other?8:0}}>{keys.map(k=>{const ind=INDICATORS.find(i=>i.key===k);return ind?(<div key={k} style={{background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 10px"}}><span style={{fontSize:11,color:C.textSub}}>{ind.label} </span><span style={{...mono,fontSize:14,fontWeight:700,color:C.text}}>{sel[k]}</span><span style={{fontSize:11,color:C.textSub}}>{ind.unit}</span></div>):null;})}</div>)}{data.other&&<NoteBlock label="その他" value={data.other}/>}</div>);
}
function BullScenarioDisplay({data}){
  if(!data)return null;if(typeof data==="string")return <NoteBlock label="強気シナリオ" value={data}/>;
  const A=parseFloat(data.A)||0,B=parseFloat(data.B)||0,CC=parseFloat(data.C)||0;
  const calcs={V:B&&CC?Math.round(2*B-CC):null,N:A&&B&&CC?Math.round(CC+(B-A)):null,E:A&&B?Math.round(2*B-A):null};
  const hasCalc=Object.values(calcs).some(v=>v!==null);
  return(<div style={{marginBottom:13}}><div style={{fontSize:10,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:7}}>強気シナリオ</div>{hasCalc&&(<div style={{display:"flex",gap:8,marginBottom:8}}>{Object.entries(calcs).map(([type,val])=>val!==null?(<div key={type} style={{flex:1,background:type===data.targetType?C.green+"18":C.surfaceEl,border:`1px solid ${type===data.targetType?C.green:C.border}`,borderRadius:8,padding:"8px 10px",textAlign:"center"}}><div style={{fontSize:10,color:type===data.targetType?C.green:C.textSub,fontWeight:700,marginBottom:3}}>{type}計算値</div><div style={{...mono,fontSize:14,fontWeight:700,color:type===data.targetType?C.green:C.text}}>{val.toLocaleString()}円</div></div>):null)}</div>)}{data.freeText&&<NoteBlock label="シナリオ詳細" value={data.freeText}/>}</div>);
}

// ── Note Card ─────────────────────────────────────────────
function NoteCard({note,onClick}){
  const avgBuy=calcAvgBuyPrice(note);
  const remaining=calcRemaining(note);
  const sells=note.sells||[];
  const totalSellAmt=sells.reduce((s,sv)=>s+(sv.price*(Number(sv.shares)||0)),0);
  const totalSellSh=sells.reduce((s,sv)=>s+(Number(sv.shares)||0),0);
  const realizedPnl=avgBuy&&totalSellSh?Math.round(totalSellAmt-avgBuy*totalSellSh):null;
  const rc=realizedPnl===null?C.textSub:realizedPnl>=0?C.green:C.red;
  const displayPrice=avgBuy||note.entry?.price;
  const firstDate=(note.buys?.[0]||note.entry)?.date;
  const buyCount=(note.buys||[]).length;
  return(
    <div onClick={onClick} style={{...paperCard,cursor:"pointer",marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div>
          <span style={{...mono,fontSize:11,color:C.amber,fontWeight:700,marginRight:8,letterSpacing:"0.04em"}}>{note.ticker}</span>
          <span style={{fontSize:16,fontWeight:600,fontFamily:serif,color:C.text}}>{note.name}</span>
        </div>
        <span style={badge(note.status)}>{STATUS[note.status]?.label}</span>
      </div>
      <div style={{height:1,background:C.border,marginBottom:10,opacity:0.5}}/>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:9,color:C.textMuted,marginBottom:2,letterSpacing:"0.06em",textTransform:"uppercase"}}>{buyCount>1?"平均取得":"エントリー"}</div>
          <div style={{...mono,fontSize:14,fontWeight:600,color:C.text}}>{fmtP(displayPrice)}</div>
        </div>
        {note.holding?.stopLoss&&<div><div style={{fontSize:9,color:C.textMuted,marginBottom:2,letterSpacing:"0.06em",textTransform:"uppercase"}}>損切り</div><div style={{...mono,fontSize:14,fontWeight:600,color:C.red}}>{fmtP(note.holding.stopLoss)}</div></div>}
        {note.holding?.takeProfit&&<div><div style={{fontSize:9,color:C.textMuted,marginBottom:2,letterSpacing:"0.06em",textTransform:"uppercase"}}>利確</div><div style={{...mono,fontSize:14,fontWeight:600,color:C.green}}>{fmtP(note.holding.takeProfit)}</div></div>}
        {realizedPnl!==null&&<div style={{marginLeft:"auto"}}><div style={{fontSize:9,color:C.textMuted,marginBottom:2,letterSpacing:"0.06em",textTransform:"uppercase"}}>確定損益</div><div style={{...mono,fontSize:14,fontWeight:600,color:rc}}>{realizedPnl>=0?"+":""}{realizedPnl.toLocaleString()}円</div></div>}
      </div>
      <div style={{fontSize:11,color:C.textMuted,marginTop:8}}>
        {remaining>0?`残 ${remaining}株`:`${note.entry?.shares||0}株`}
        {buyCount>1&&<span style={{marginLeft:6,color:C.textMuted}}>({buyCount}回購入)</span>}
        {sells.length>0&&<span style={{marginLeft:6,color:C.textMuted}}>{sells.length}回売却</span>}
        <span style={{marginLeft:8}}>{fmt(firstDate)}</span>
      </div>
    </div>
  );
}

// ── List View ─────────────────────────────────────────────
function ListView({notes,allNotes,filter,onFilter,onSelect,onNew}){
  const tabs=[{k:"all",l:"すべて",n:allNotes.length},{k:"holding",l:"保有中",n:allNotes.filter(x=>x.status==="holding").length},{k:"exited",l:"売却済",n:allNotes.filter(x=>x.status==="exited").length}];
  return(
    <div style={scr}>
      <div style={hdr}>
        <div>
          <div style={{fontSize:10,color:C.amber,fontWeight:700,letterSpacing:"0.18em",marginBottom:2,textTransform:"uppercase"}}>Investment</div>
          <div style={{fontSize:22,fontWeight:700,letterSpacing:"-0.01em",fontFamily:serif,color:C.text}}>投資ノート</div>
        </div>
        <div style={{marginLeft:"auto",fontSize:12,color:C.textMuted}}>{allNotes.length}銘柄</div>
      </div>
      <div style={{display:"flex",gap:6,padding:"12px 16px",borderBottom:`1px solid ${C.border}`,overflowX:"auto"}}>
        {tabs.map(t=>(<button key={t.k} onClick={()=>onFilter(t.k)} style={{padding:"5px 14px",borderRadius:4,border:`1.5px solid ${filter===t.k?C.text:C.border}`,cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",background:filter===t.k?C.text:"transparent",color:filter===t.k?C.surface:C.textSub,letterSpacing:"0.03em"}}>{t.l}{t.n>0&&<span style={{marginLeft:4,opacity:0.6}}>{t.n}</span>}</button>))}
      </div>
      <div style={{padding:"12px 16px"}}>
        {notes.length===0?(<div style={{textAlign:"center",padding:"64px 20px",color:C.textMuted}}><div style={{fontSize:44,marginBottom:14}}>📒</div><div style={{fontSize:15,color:C.textSub,marginBottom:6,fontFamily:serif}}>ノートがありません</div><div style={{fontSize:13}}>右下の ＋ で最初のノートを作成</div></div>):notes.map(n=><NoteCard key={n.id} note={n} onClick={()=>onSelect(n.id)}/>)}
      </div>
      <button style={fab} onClick={onNew}>＋</button>
    </div>
  );
}

// ── Wizard View ───────────────────────────────────────────
function WizardView({steps,stepIdx,data,onChange,onNext,onBack,title}){
  const step=steps[stepIdx];
  const canNext=getCanNext(step,data);
  const isLast=stepIdx===steps.length-1;
  const val=data[step.key];
  const renderInput=()=>{
    switch(step.type){
      case"stockSearch":return <StockSearchInput value={val||{ticker:"",name:""}} onChange={v=>onChange(step.key,v)}/>;
      case"fundamentals":return <FundamentalsInput value={val||{selected:{},other:""}} onChange={v=>onChange(step.key,v)}/>;
      case"bullScenario":return <BullScenarioInput value={val||{A:"",B:"",C:"",targetType:"N",freeText:""}} onChange={v=>onChange(step.key,v)}/>;
      case"textarea":return <textarea style={ta} value={val||""} onChange={e=>onChange(step.key,e.target.value)} placeholder={step.ph} autoFocus/>;
      case"select":return <div style={{display:"flex",flexDirection:"column",gap:9}}>{step.options.map(o=>(<button key={o.v} onClick={()=>onChange(step.key,o.v)} style={{padding:"13px 17px",borderRadius:10,fontSize:15,fontWeight:600,cursor:"pointer",textAlign:"left",border:`2px solid ${val===o.v?C.blue:C.border}`,background:val===o.v?C.blue+"20":C.surfaceEl,color:val===o.v?C.blue:C.text}}>{o.l}</button>))}</div>;
      default:return <input style={inp} type={step.type} value={val||""} onChange={e=>onChange(step.key,e.target.value)} placeholder={step.ph} onKeyDown={e=>e.key==="Enter"&&canNext&&onNext()} autoFocus/>;
    }
  };
  return(
    <div style={{...scr,display:"flex",flexDirection:"column"}}>
      <div style={hdr}>
        <button onClick={onBack} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,color:C.textSub,fontSize:14,cursor:"pointer",padding:"5px 12px",fontWeight:600}}>← 戻る</button>
        <div style={{flex:1,marginLeft:8}}><div style={{fontSize:11,color:C.textSub}}>{title}</div><div style={{fontSize:12,color:C.blue,fontWeight:600}}>{stepIdx+1} / {steps.length}</div></div>
      </div>
      <div style={{height:3,background:C.border}}><div style={{height:"100%",width:`${(stepIdx+1)/steps.length*100}%`,background:C.blue,transition:"width 0.3s ease"}}/></div>
      <div style={{flex:1,padding:"24px 20px 20px",display:"flex",flexDirection:"column"}}>
        <div style={{fontSize:19,fontWeight:700,color:C.text,marginBottom:6,lineHeight:1.45}}>{step.q}</div>
        {step.hint&&<div style={{fontSize:13,color:C.textSub,marginBottom:18,lineHeight:1.55}}>{step.hint}</div>}
        {!step.hint&&<div style={{marginBottom:18}}/>}
        <div style={{flex:1}}>{renderInput()}</div>
        <div style={{paddingTop:20,display:"flex",flexDirection:"column",gap:9}}>
          <button style={{...btn(canNext?C.blue:"ghost"),opacity:canNext?1:0.45}} onClick={onNext} disabled={!canNext}>{isLast?"完了 ✓":"次へ →"}</button>
          {!step.req&&<button style={btn("ghost")} onClick={onNext}>スキップ</button>}
        </div>
      </div>
    </div>
  );
}

// ── Detail View ───────────────────────────────────────────
function DetailView({note,onBack,onEditHolding,onAddLog,onAddBuy,onAddSell,onDeleteBuy,onDeleteSell,onDeleteNote,onExport,toast}){
  const buys=note.buys||[];
  const sells=note.sells||[];
  const avgBuy=calcAvgBuyPrice(note);
  const remaining=calcRemaining(note);
  const isHolding=note.status==="holding";
  const totalRealizedPnl=avgBuy?Math.round(sells.reduce((s,sv)=>{const sh=Number(sv.shares)||0;return s+(sv.price-avgBuy)*sh;},0)):0;
  const[confirmDeleteTx,setConfirmDeleteTx]=useState(null); // {type:'buy'|'sell', id, label}
  const execDeleteTx=()=>{
    if(!confirmDeleteTx)return;
    confirmDeleteTx.type==='buy'?onDeleteBuy(confirmDeleteTx.id):onDeleteSell(confirmDeleteTx.id);
    setConfirmDeleteTx(null);
  };
  const Card=({accent,icon,label,children})=>(<div style={{background:C.surface,border:`1px solid ${C.border}`,borderLeft:`3px solid ${accent||C.border}`,borderRadius:12,margin:"12px 14px",overflow:"hidden"}}><div style={{padding:"11px 15px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:7}}><span>{icon}</span><span style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:accent||C.textSub}}>{label}</span></div><div style={{padding:"14px 15px"}}>{children}</div></div>);
  const TxRow=({label,v,color,onDel})=>(
    <div style={{display:"flex",alignItems:"center",background:C.bg,borderRadius:8,padding:"10px 12px",marginBottom:6}}>
      <div style={{flex:1}}>
        <div style={{fontSize:10,color:C.textMuted,marginBottom:2}}>{label}</div>
        <div style={{fontSize:14,color:color||C.text,fontWeight:600,...mono}}>{v}</div>
      </div>
      <button onClick={onDel} title="削除" style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:16,padding:"4px 6px",opacity:0.7}}>🗑</button>
    </div>
  );
  return(
    <div style={scr}>
      <div style={{...hdr,flexDirection:"column",alignItems:"flex-start",gap:3}}>
        <div style={{display:"flex",alignItems:"center",width:"100%",gap:8}}>
          <button onClick={onBack} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,color:C.textSub,fontSize:13,cursor:"pointer",padding:"5px 10px",fontWeight:600}}>← 一覧</button>
          <span style={{...mono,fontSize:13,color:C.amber,fontWeight:700}}>{note.ticker}</span>
          <span style={badge(note.status)}>{STATUS[note.status]?.label}</span>
          <div style={{marginLeft:"auto",display:"flex",gap:6}}>
            <button onClick={onExport} style={{background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:7,color:C.textSub,fontSize:12,cursor:"pointer",padding:"5px 10px"}}>📋 MD</button>
            <button onClick={onDeleteNote} title="銘柄を削除" style={{background:C.red+"15",border:`1px solid ${C.red}40`,borderRadius:7,color:C.red,fontSize:12,cursor:"pointer",padding:"5px 10px"}}>🗑 削除</button>
          </div>
        </div>
        <div style={{paddingLeft:2,fontSize:17,fontWeight:800,letterSpacing:"-0.01em",marginTop:2,fontFamily:serif}}>{note.name}</div>
      </div>
      {toast&&<div style={{margin:"8px 14px",background:C.green+"18",border:`1px solid ${C.green}40`,borderRadius:8,padding:"8px 13px",fontSize:13,color:C.green}}>✓ Markdownをコピー — Obsidianに貼り付けてください</div>}

      <Card accent={C.blue} icon="🎯" label="Phase 1 — 投資根拠">
        <NoteBlock label="テクニカル根拠" value={note.entry?.technical}/>
        <FundamentalDisplay data={note.entry?.fundamental}/>
        <BullScenarioDisplay data={note.entry?.bullScenario}/>
        <NoteBlock label="弱気・撤退条件" value={note.entry?.bearScenario}/>
        <NoteBlock label="マクロ環境" value={note.entry?.macro}/>
      </Card>

      <Card accent={C.amber} icon="💴" label="Phase 2 — 取引履歴">
        <div style={{marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:11,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>購入履歴</div>
            {avgBuy>0&&<div style={{marginLeft:"auto",...mono,fontSize:12,color:C.textSub}}>平均 {fmtP(avgBuy)} / 残り {remaining}株</div>}
          </div>
          {buys.map(b=>(
            <TxRow key={b.id}
              label={fmt(b.date)}
              v={`${fmtP(b.price)} × ${b.shares||0}株 = ${b.price&&b.shares?(b.price*(b.shares||0)).toLocaleString()+"円":"—"}`}
              onDel={()=>setConfirmDeleteTx({type:'buy',id:b.id,label:`購入 ${fmt(b.date)} ${fmtP(b.price)}×${b.shares||0}株`})}/>
          ))}
          <button style={{...btn("ghost"),fontSize:13,padding:"9px",marginTop:2}} onClick={onAddBuy}>＋ 追加購入を記録</button>
        </div>

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14}}>
          <div style={{fontSize:11,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>売却履歴</div>
          {sells.map(sv=>{
            const sh=Number(sv.shares)||0;
            const pnl=avgBuy&&sh?Math.round((sv.price-avgBuy)*sh):null;
            const rate=avgBuy?((sv.price-avgBuy)/avgBuy*100).toFixed(1):null;
            const pc=(pnl||0)>=0?C.green:C.red;
            return(
              <div key={sv.id} style={{background:C.bg,borderRadius:8,padding:"10px 12px",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"flex-start"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,color:C.textMuted,marginBottom:2}}>{fmt(sv.date)} · {EXIT_REASON[sv.reason]||sv.reason}</div>
                    <div style={{...mono,fontSize:14,fontWeight:600}}>
                      {fmtP(sv.price)} × {sh}株
                      {pnl!==null&&<span style={{color:pc,marginLeft:8}}>{pnl>=0?"+":""}{pnl.toLocaleString()}円（{rate>=0?"+":""}{rate}%）</span>}
                    </div>
                  </div>
                  <button onClick={()=>setConfirmDeleteTx({type:'sell',id:sv.id,label:`売却 ${fmt(sv.date)} ${fmtP(sv.price)}×${Number(sv.shares)||0}株`})} style={{background:"none",border:"none",color:C.textMuted,cursor:"pointer",fontSize:16,padding:"4px 6px",opacity:0.7}}>🗑</button>
                </div>
                {(sv.comparison||sv.lessons)&&(
                  <div style={{marginTop:8,paddingTop:8,borderTop:`1px solid ${C.border}40`}}>
                    {sv.comparison&&<div style={{fontSize:12,color:C.textSub,marginBottom:3,lineHeight:1.5}}><span style={{fontWeight:600}}>振り返り: </span>{sv.comparison}</div>}
                    {sv.lessons&&<div style={{fontSize:12,color:C.textSub,lineHeight:1.5}}><span style={{fontWeight:600}}>改善点: </span>{sv.lessons}</div>}
                  </div>
                )}
              </div>
            );
          })}
          {remaining>0&&<button style={{...btn(C.amber,"#1a0e00"),fontSize:13,padding:"9px",marginTop:2}} onClick={onAddSell}>＋ 売却を記録する</button>}
          {sells.length>0&&(
            <div style={{...mono,fontSize:13,textAlign:"right",marginTop:10,color:C.textSub}}>
              確定損益計: <span style={{fontWeight:700,color:totalRealizedPnl>=0?C.green:C.red}}>{totalRealizedPnl>=0?"+":""}{totalRealizedPnl.toLocaleString()}円</span>
            </div>
          )}
        </div>

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14,marginTop:2}}>
          <div style={{display:"flex",gap:10,marginBottom:note.holding?.scenarioBreaker?10:0}}>
            {[{l:"損切りライン",v:fmtP(note.holding?.stopLoss),c:C.red},{l:"利確目標",v:fmtP(note.holding?.takeProfit),c:C.green}].map(s=>(<div key={s.l} style={{flex:1,background:s.c+"12",border:`1px solid ${s.c}30`,borderRadius:9,padding:"10px 12px"}}><div style={{fontSize:10,color:s.c,fontWeight:700,marginBottom:3}}>{s.l}</div><div style={{...mono,fontSize:16,fontWeight:700,color:s.c}}>{s.v}</div></div>))}
          </div>
          {note.holding?.scenarioBreaker&&<NoteBlock label="シナリオ崩れ条件" value={note.holding.scenarioBreaker}/>}
          {note.holding?.logs?.length>0&&(<div style={{marginTop:10}}><div style={{fontSize:10,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>保有ログ</div>{[...note.holding.logs].reverse().map(l=>(<div key={l.id} style={{borderLeft:`2px solid ${C.border}`,paddingLeft:12,marginBottom:12}}><div style={{fontSize:11,color:C.amber,marginBottom:2}}>{fmt(l.date)}</div><div style={{fontSize:14,color:C.text,lineHeight:1.65,whiteSpace:"pre-wrap"}}>{l.memo}</div></div>))}</div>)}
          {isHolding&&(<div style={{display:"flex",gap:8,marginTop:10}}><button style={{...btn("ghost"),flex:1,fontSize:13,padding:"9px"}} onClick={onEditHolding}>ライン更新</button><button style={{...btn("ghost"),flex:1,fontSize:13,padding:"9px"}} onClick={onAddLog}>ログ追記</button></div>)}
        </div>
      </Card>
      <div style={{height:24}}/>
      {confirmDeleteTx&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{background:C.surface,borderRadius:"16px 16px 0 0",padding:"24px 20px 40px",width:"100%",maxWidth:480,borderTop:`3px solid ${C.red}`}}>
            <div style={{fontFamily:serif,fontSize:17,fontWeight:700,marginBottom:8,color:C.text}}>この記録を削除しますか？</div>
            <div style={{fontSize:13,color:C.textSub,marginBottom:6,lineHeight:1.6,background:C.bg,borderRadius:8,padding:"10px 12px"}}>{confirmDeleteTx.label}</div>
            <div style={{fontSize:12,color:C.textMuted,marginBottom:22}}>この操作は取り消せません。</div>
            <button style={{...btn(C.red,"#fff"),marginBottom:10}} onClick={execDeleteTx}>削除する</button>
            <button style={btn("ghost")} onClick={()=>setConfirmDeleteTx(null)}>キャンセル</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AddBuyView({onSave,onBack}){
  const[date,setDate]=useState(todayStr());
  const[price,setPrice]=useState('');
  const[shares,setShares]=useState('');
  const ok=price&&shares&&date;
  return(
    <div style={scr}>
      <div style={hdr}><button onClick={onBack} style={bkBtn}>← 戻る</button><span style={{fontSize:16,fontWeight:700,marginLeft:8,fontFamily:serif}}>追加購入を記録</span></div>
      <div style={{padding:'22px 20px'}}>
        {[{l:'購入日',t:'date',v:date,s:setDate,p:''},{l:'購入株価（円）',t:'number',v:price,s:setPrice,p:'例: 3100'},{l:'購入株数',t:'number',v:shares,s:setShares,p:'例: 100'}].map((f,i)=>(
          <div key={i} style={{marginBottom:18}}>
            <label style={{display:'block',fontSize:13,color:C.textSub,marginBottom:7,fontWeight:600}}>{f.l}</label>
            <input style={inp} type={f.t} value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.p} autoFocus={i===0}/>
          </div>
        ))}
        <button style={{...btn(C.blue),opacity:ok?1:0.45}} onClick={()=>ok&&onSave({date,price:Number(price),shares:Number(shares)})} disabled={!ok}>
          追加購入を記録する
        </button>
      </div>
    </div>
  );
}
// ── HoldingEdit / AddLog ──────────────────────────────────
function HoldingEditView({data,onChange,onSave,onBack}){
  return(<div style={scr}><div style={hdr}><button onClick={onBack} style={bkBtn}>← 戻る</button><span style={{fontSize:16,fontWeight:700,marginLeft:8}}>ライン設定・更新</span></div><div style={{padding:"22px 20px"}}>{[{key:"stopLoss",l:"損切りライン（円）",c:C.red,ph:"例: 2900"},{key:"takeProfit",l:"利確目標（円）",c:C.green,ph:"例: 4200"}].map(f=>(<div key={f.key} style={{marginBottom:20}}><label style={{display:"block",fontSize:13,color:f.c,marginBottom:7,fontWeight:700}}>{f.l}</label><input style={{...inp,borderColor:f.c+"60"}} type="number" value={data[f.key]||""} onChange={e=>onChange(f.key,e.target.value)} placeholder={f.ph}/></div>))}<div style={{marginBottom:26}}><label style={{display:"block",fontSize:13,color:C.textSub,marginBottom:7,fontWeight:600}}>シナリオ崩れ条件</label><textarea style={ta} value={data.scenarioBreaker||""} onChange={e=>onChange("scenarioBreaker",e.target.value)} placeholder="例: 雲に潜ったら即売り。決算で売上減少なら撤退。"/></div><button style={btn(C.green,"#0a2015")} onClick={onSave}>保存する</button></div></div>);
}
function AddLogView({date,memo,onDateChange,onMemoChange,onSave,onBack}){
  return(<div style={scr}><div style={hdr}><button onClick={onBack} style={bkBtn}>← 戻る</button><span style={{fontSize:16,fontWeight:700,marginLeft:8}}>保有ログを追記</span></div><div style={{padding:"22px 20px"}}><div style={{marginBottom:18}}><label style={{display:"block",fontSize:13,color:C.textSub,marginBottom:7,fontWeight:600}}>日付</label><input style={inp} type="date" value={date} onChange={e=>onDateChange(e.target.value)}/></div><div style={{marginBottom:26}}><label style={{display:"block",fontSize:13,color:C.textSub,marginBottom:7,fontWeight:600}}>メモ</label><textarea style={{...ta,minHeight:150}} value={memo} onChange={e=>onMemoChange(e.target.value)} placeholder="例: 決算発表。売上+28%で強い内容。引き続き保有。" autoFocus/></div><button style={{...btn(C.blue),opacity:memo.trim()?1:0.45}} onClick={onSave} disabled={!memo.trim()}>追記する</button></div></div>);
}

// ── P&L Screen ────────────────────────────────────────────
function buildTrades(notes){
  const result=[];
  (notes||[]).forEach(n=>{
    const buys=n.buys||[],sells=n.sells||[];
    if(!sells.length)return;
    const totalBuySh=buys.reduce((s,b)=>s+(Number(b.shares)||0),0);
    const totalBuyAmt=buys.reduce((s,b)=>s+(b.price*(Number(b.shares)||0)),0);
    const avgBuy=totalBuySh?totalBuyAmt/totalBuySh:0;
    sells.forEach(sv=>{
      const sh=Number(sv.shares)||0;
      const pnlAmt=avgBuy&&sh?Math.round((sv.price-avgBuy)*sh):null;
      const rate=avgBuy?((sv.price-avgBuy)/avgBuy*100).toFixed(1):null;
      const buyAmt=avgBuy&&sh?Math.round(avgBuy*sh):null;
      const sellAmt=sh?Math.round(sv.price*sh):null;
      const days=buys[0]?.date&&sv.date?Math.round((new Date(sv.date)-new Date(buys[0].date))/86400000):null;
      result.push({id:sv.id,noteId:n.id,ticker:n.ticker,name:n.name,buyP:Math.round(avgBuy),sellP:sv.price,shares:sh,buyAmt,sellAmt,pnlAmt,rate,days,win:(pnlAmt||0)>=0,sellDate:sv.date,buyDate:buys[0]?.date,reason:sv.reason});
    });
  });
  return result.sort((a,b)=>(a.sellDate||'').localeCompare(b.sellDate||''));
}
function SummaryCard({label,value,sub,color,wide}){return(<div style={{...paperCard,flex:wide?1.5:1,display:"flex",flexDirection:"column",justifyContent:"center"}}><div style={{fontSize:9,color:C.textMuted,fontWeight:700,marginBottom:4,letterSpacing:"0.1em",textTransform:"uppercase"}}>{label}</div><div style={{...mono,fontSize:wide?20:16,fontWeight:700,color:color||C.text}}>{value}</div>{sub&&<div style={{...mono,fontSize:11,color:color||C.textSub,marginTop:2}}>{sub}</div>}</div>);}
function TradeCard({trade:t,onClick}){
  const pc=t.win?C.green:C.red;
  return(<div onClick={onClick} style={{background:C.surface,border:`1px solid ${C.border}`,borderLeft:`3px solid ${pc}`,borderRadius:12,padding:"13px 14px",marginBottom:9,cursor:"pointer"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}><div><span style={{...mono,fontSize:12,color:C.blue,fontWeight:700,marginRight:6}}>{t.ticker}</span><span style={{fontSize:14,fontWeight:700}}>{t.name}</span></div><div style={{textAlign:"right"}}><div style={{...mono,fontSize:15,fontWeight:800,color:pc}}>{t.pnlAmt!==null?(t.win?"+":"")+t.pnlAmt.toLocaleString()+"円":"—"}</div><div style={{...mono,fontSize:12,color:pc}}>{t.win?"+":""}{t.rate}%</div></div></div><div style={{display:"flex",gap:10,fontSize:12,color:C.textSub,alignItems:"center"}}><span>買 <span style={{...mono,color:C.text}}>{fmtP(t.buyP)}</span>{t.shares&&<span style={{color:C.textMuted}}> ×{t.shares}株</span>}</span><span style={{color:C.border}}>→</span><span>売 <span style={{...mono,color:C.text}}>{fmtP(t.sellP)}</span></span>{t.days!==null&&<span style={{marginLeft:"auto",fontSize:11,color:C.textMuted}}>{t.days}日保有</span>}</div>{(t.buyAmt||t.sellAmt)&&(<div style={{display:"flex",gap:14,fontSize:12,marginTop:7,paddingTop:7,borderTop:`1px solid ${C.border}`}}><span style={{color:C.textSub}}>購入額 <span style={{...mono,color:C.text}}>{t.buyAmt?t.buyAmt.toLocaleString()+"円":"—"}</span></span><span style={{color:C.textSub}}>売却額 <span style={{...mono,color:C.text}}>{t.sellAmt?t.sellAmt.toLocaleString()+"円":"—"}</span></span></div>)}<div style={{fontSize:11,color:C.textMuted,marginTop:6}}>{fmt(t.buyDate)} → {fmt(t.sellDate)}</div></div>);
}
function PnLScreen({notes,onSelectNote}){
  const trades=buildTrades(notes);
  let cum=0;
  const chartData=trades.map(t=>{if(t.pnlAmt!==null)cum+=t.pnlAmt;return{ts:new Date(t.sellDate).getTime(),cum,ticker:t.ticker};});
  const totalPnl=trades.reduce((s,t)=>s+(t.pnlAmt||0),0);
  const totalBuy=trades.reduce((s,t)=>s+(t.buyAmt||0),0);
  const wins=trades.filter(t=>t.win).length;
  const winRate=trades.length?Math.round((wins/trades.length)*100):null;
  const totalReturn=totalBuy?((totalPnl/totalBuy)*100).toFixed(1):null;
  const pc=totalPnl>=0?C.green:C.red;
  const missingShares=trades.some(t=>!t.entry?.shares);
  return(
    <div style={scr}>
      <div style={hdr}><div><div style={{fontSize:10,color:C.amber,fontWeight:700,letterSpacing:"0.18em",marginBottom:2,textTransform:"uppercase"}}>Performance</div><div style={{fontSize:22,fontWeight:700,letterSpacing:"-0.01em",fontFamily:serif,color:C.text}}>投資収支</div></div><div style={{marginLeft:"auto",fontSize:12,color:C.textMuted}}>{trades.length}取引</div></div>
      {trades.length===0?(<div style={{textAlign:"center",padding:"64px 20px",color:C.textMuted}}><div style={{fontSize:44,marginBottom:14}}>📊</div><div style={{fontSize:15,color:C.textSub,marginBottom:6}}>売却済み銘柄がありません</div><div style={{fontSize:13}}>ノートで「売却記録」を入力すると収支が集計されます</div></div>):(
        <>
          <div style={{padding:"12px 14px 4px",display:"flex",gap:8}}><SummaryCard label="累計確定損益" value={(totalPnl>=0?"+":"")+totalPnl.toLocaleString()+"円"} sub={totalReturn?(parseFloat(totalReturn)>=0?"+":"")+totalReturn+"%":null} color={pc} wide/><div style={{display:"flex",flexDirection:"column",gap:8,flex:1}}><SummaryCard label="勝率" value={winRate!==null?winRate+"%":"—"} sub={`${wins}勝${trades.length-wins}敗`} color={C.blue}/></div></div>
          {missingShares&&<div style={{margin:"4px 14px 0",background:C.amber+"15",border:`1px solid ${C.amber}40`,borderRadius:8,padding:"7px 12px",fontSize:12,color:C.amber}}>⚠️ 株数未入力のノートは損益金額に含まれません（損益率のみ表示）</div>}
          <div style={{padding:"14px 14px 0"}}><div style={{fontSize:11,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>取引履歴</div>{[...trades].reverse().map(t=><TradeCard key={t.id} trade={t} onClick={()=>onSelectNote(t.id)}/>)}</div>
          {chartData.length>1&&(<div style={{margin:"6px 14px 0",background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 8px 10px"}}><div style={{fontSize:11,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",paddingLeft:8,marginBottom:10}}>累計損益の推移（時間軸）</div><ResponsiveContainer width="100%" height={180}><LineChart data={chartData} margin={{left:6,right:16,top:4,bottom:0}}><CartesianGrid strokeDasharray="3 3" stroke={C.border}/><XAxis dataKey="ts" type="number" scale="time" domain={["dataMin","dataMax"]} tick={{fill:C.textSub,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={ts=>{const d=new Date(ts);return`${d.getMonth()+1}/${d.getDate()}`;}} /><YAxis tick={{fill:C.textSub,fontSize:10}} axisLine={false} tickLine={false} width={42} tickFormatter={v=>Math.abs(v)>=10000?(v/10000).toFixed(1)+"万":v.toLocaleString()}/><ReferenceLine y={0} stroke={C.textSub} strokeWidth={1}/><Tooltip contentStyle={{background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12}} labelStyle={{color:C.textSub}} itemStyle={{color:pc}} labelFormatter={ts=>fmt(new Date(ts).toISOString().slice(0,10))} formatter={v=>[(v>=0?"+":"")+v.toLocaleString()+"円","累計損益"]}/><Line type="monotone" dataKey="cum" stroke={pc} strokeWidth={2.5} dot={{r:3,fill:pc}} activeDot={{r:5}}/></LineChart></ResponsiveContainer></div>)}
        </>
      )}
    </div>
  );
}

// ── Bottom Nav ────────────────────────────────────────────
function BottomNav({active,onChange}){
  const tabs=[{key:"notes",icon:"📋",label:"ノート"},{key:"pnl",icon:"📈",label:"収支"},{key:"learn",icon:"🎓",label:"学習"}];
  return(<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(245,238,218,0.96)",backdropFilter:"blur(16px)",borderTop:`1px solid ${C.border}`,display:"flex",zIndex:90}}>{tabs.map(t=>(<button key={t.key} onClick={()=>onChange(t.key)} style={{flex:1,padding:"8px 4px 10px",border:"none",background:"none",cursor:"pointer",color:active===t.key?C.blue:C.textSub,borderTop:`2px solid ${active===t.key?C.blue:"transparent"}`}}><div style={{fontSize:19,opacity:active===t.key?1:0.55}}>{t.icon}</div><div style={{fontSize:11,fontWeight:600,marginTop:2}}>{t.label}</div></button>))}</div>);
}

// ── Learning Mode ─────────────────────────────────────────
function LearningHome({data,onOpenSection,onAddSection,onOpenNote}){
  const{sections,notes,memos}=data;
  const pinned=notes.filter(n=>n.pinned);
  const[adding,setAdding]=useState(false);
  const[name,setName]=useState("");
  const submit=()=>{if(name.trim()){onAddSection(name.trim());setName("");setAdding(false);}};
  const memoCount=(noteId)=>memos.filter(m=>m.noteId===noteId).length;
  return(
    <div style={scr}>
      <div style={hdr}><div><div style={{fontSize:10,color:C.amber,fontWeight:700,letterSpacing:"0.18em",marginBottom:2,textTransform:"uppercase"}}>Learning</div><div style={{fontSize:22,fontWeight:700,letterSpacing:"-0.01em",fontFamily:serif,color:C.text}}>学習メモ</div></div><div style={{marginLeft:"auto",fontSize:12,color:C.textMuted}}>{notes.length}ノート</div></div>
      {pinned.length>0&&(<div style={{padding:"14px 0 0"}}><div style={{fontSize:11,color:C.amber,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",padding:"0 14px",marginBottom:8}}>📌 ピン留め</div><div style={{display:"flex",gap:8,overflowX:"auto",padding:"0 14px 4px"}}>{pinned.map(n=>(<div key={n.id} onClick={()=>onOpenNote(n)} style={{minWidth:160,maxWidth:160,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 12px",cursor:"pointer",flexShrink:0}}><div style={{fontSize:10,color:C.textSub,marginBottom:4}}>📓 {memoCount(n.id)}メモ</div><div style={{fontSize:13,fontWeight:700,color:C.text,lineHeight:1.4,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}>{n.title||"(無題のノート)"}</div></div>))}</div></div>)}
      <div style={{padding:"16px 14px 0"}}>
        <div style={{display:"flex",alignItems:"center",marginBottom:10}}><div style={{fontSize:11,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>セクション</div><button onClick={()=>setAdding(a=>!a)} style={{marginLeft:"auto",background:"none",border:"none",color:C.blue,fontSize:13,fontWeight:600,cursor:"pointer"}}>+ 追加</button></div>
        {adding&&(<div style={{display:"flex",gap:8,marginBottom:10}}><input style={{...inp,flex:1}} value={name} onChange={e=>setName(e.target.value)} placeholder="セクション名" autoFocus onKeyDown={e=>e.key==="Enter"&&submit()}/><button style={{...btn(C.blue),width:"auto",padding:"0 18px"}} onClick={submit}>OK</button></div>)}
        {sections.map(s=>{const count=notes.filter(n=>n.sectionId===s.id).length;return(<div key={s.id} onClick={()=>onOpenSection(s)} style={{background:C.surface,border:`1px solid ${C.border}`,borderLeft:`3px solid ${s.color}`,borderRadius:10,padding:"14px 15px",marginBottom:8,cursor:"pointer",display:"flex",alignItems:"center"}}><span style={{fontSize:15,fontWeight:700,color:C.text}}>{s.name}</span><span style={{marginLeft:"auto",fontSize:13,color:C.textSub}}>{count}ノート ›</span></div>);})}
      </div>
    </div>
  );
}
function SectionView({section,notes,memos,onBack,onAddNote,onOpenNote}){
  const list=notes.filter(n=>n.sectionId===section.id).sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0)||(b.updatedAt||"").localeCompare(a.updatedAt||""));
  const memoCount=(noteId)=>memos.filter(m=>m.noteId===noteId).length;
  const lastMemo=(noteId)=>{const ms=memos.filter(m=>m.noteId===noteId).sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||""));return ms[0];};
  return(
    <div style={scr}>
      <div style={hdr}><button onClick={onBack} style={bkBtn}>← 学習</button><span style={{fontSize:16,fontWeight:700,marginLeft:8,borderLeft:`3px solid ${section.color}`,paddingLeft:10}}>{section.name}</span></div>
      <div style={{padding:"14px 14px 0"}}>
        {list.length===0?(<div style={{textAlign:"center",padding:"56px 20px",color:C.textMuted}}><div style={{fontSize:40,marginBottom:12}}>📓</div><div style={{fontSize:14,color:C.textSub}}>ノートがまだありません</div><div style={{fontSize:13,marginTop:4}}>右下の ＋ でノートを追加</div></div>):list.map((n,i)=>{const lm=lastMemo(n.id);return(
          <div key={n.id} onClick={()=>onOpenNote(n)} style={{background:C.surface,border:`1px solid ${C.border}`,borderLeft:`3px solid ${section.color}`,borderRadius:12,padding:"14px 15px",marginBottom:9,cursor:"pointer",animation:`slideUp .32s cubic-bezier(.32,.72,0,1) ${i*0.035}s both`}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:15,fontWeight:700,color:C.text,flex:1}}>{n.title||"(無題のノート)"}</span>{n.pinned&&<span style={{fontSize:12}}>📌</span>}</div>
            {lm&&<div style={{fontSize:12,color:C.textSub,marginTop:5,lineHeight:1.5,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{lm.title?lm.title+" — ":""}{lm.content}</div>}
            <div style={{display:"flex",gap:10,marginTop:8,fontSize:11,color:C.textMuted}}><span>📝 {memoCount(n.id)}メモ</span><span style={{marginLeft:"auto"}}>{fmt((n.updatedAt||"").slice(0,10))}</span></div>
          </div>
        );})}
      </div>
      <button style={fab} onClick={onAddNote}>＋</button>
    </div>
  );
}
function NoteView({note,memos,onBack,onAddMemo,onEditMemo,onDeleteMemo,onRenameNote,onTogglePin,onDeleteNote,accent}){
  const list=memos.filter(m=>m.noteId===note.id).sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||""));
  const[composing,setComposing]=useState(false);
  const[mTitle,setMTitle]=useState("");
  const[text,setText]=useState("");
  const[editingTitle,setEditingTitle]=useState(false);
  const[titleVal,setTitleVal]=useState(note.title||"");
  const[menu,setMenu]=useState(false);
  const submit=()=>{if(mTitle.trim()||text.trim()){onAddMemo(mTitle.trim(),text.trim());setMTitle("");setText("");setComposing(false);}};
  const saveTitle=()=>{onRenameNote(titleVal.trim()||"(無題のノート)");setEditingTitle(false);};
  return(
    <div style={scr}>
      <div style={hdr}>
        <button onClick={onBack} style={bkBtn}>← 戻る</button>
        {editingTitle?(<input style={{...inp,flex:1,marginLeft:8,fontSize:15,fontWeight:700}} value={titleVal} onChange={e=>setTitleVal(e.target.value)} autoFocus onKeyDown={e=>e.key==="Enter"&&saveTitle()} onBlur={saveTitle}/>):(<span onClick={()=>setEditingTitle(true)} style={{fontSize:16,fontWeight:700,marginLeft:8,flex:1,cursor:"text",borderLeft:`3px solid ${accent||C.blue}`,paddingLeft:10}}>{note.title||"(無題のノート)"}</span>)}
        <button onClick={onTogglePin} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",opacity:note.pinned?1:0.35}}>📌</button>
        <button onClick={()=>setMenu(m=>!m)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:C.textSub,padding:"0 4px"}}>⋯</button>
      </div>
      {menu&&(<div style={{margin:"8px 14px 0",background:C.surfaceEl,border:`1px solid ${C.border}`,borderRadius:10,padding:6}}><button onClick={onDeleteNote} style={{width:"100%",background:"none",border:"none",color:C.red,fontSize:14,padding:"10px",cursor:"pointer",textAlign:"left"}}>🗑 このノートを削除</button></div>)}
      <div style={{padding:"16px 14px 0"}}>
        <div style={{fontSize:11,color:C.textSub,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>メモ（{list.length}）</div>
        {list.length===0&&!composing&&(<div style={{textAlign:"center",padding:"40px 20px",color:C.textMuted}}><div style={{fontSize:36,marginBottom:10}}>✏️</div><div style={{fontSize:13,color:C.textSub}}>下の ＋ でメモを書き始めましょう</div></div>)}
        {list.map((m,i)=>(<div key={m.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"13px 15px",marginBottom:9,animation:`slideUp .3s cubic-bezier(.32,.72,0,1) ${i*0.03}s both`}}>{m.title&&<div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:6,lineHeight:1.4}}>{m.title}</div>}{m.content&&<div style={{fontSize:14,color:m.title?C.textSub:C.text,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{m.content}</div>}<div style={{display:"flex",alignItems:"center",gap:12,marginTop:9,paddingTop:9,borderTop:`1px solid ${C.border}`}}><span style={{fontSize:11,color:C.textMuted}}>{fmt((m.createdAt||"").slice(0,10))}</span><button onClick={()=>onEditMemo(m)} style={{marginLeft:"auto",background:"none",border:"none",color:C.blue,fontSize:12,cursor:"pointer"}}>編集</button><button onClick={()=>onDeleteMemo(m.id)} style={{background:"none",border:"none",color:C.textSub,fontSize:12,cursor:"pointer"}}>削除</button></div></div>))}
      </div>
      {composing?(<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:C.surface,borderTop:`1px solid ${C.border}`,padding:"12px 14px",zIndex:95,animation:"slideUp .25s ease",boxShadow:"0 -8px 24px rgba(0,0,0,0.35)"}}><input style={{...inp,fontSize:15,fontWeight:700,marginBottom:8}} value={mTitle} onChange={e=>setMTitle(e.target.value)} placeholder="タイトル（任意）" autoFocus/><textarea style={{...ta,minHeight:80}} value={text} onChange={e=>setText(e.target.value)} placeholder="詳細・学んだこと・気づきを記入..."/><div style={{display:"flex",gap:8,marginTop:8}}><button style={{...btn("ghost"),flex:1}} onClick={()=>{setComposing(false);setMTitle("");setText("");}}>キャンセル</button><button style={{...btn((mTitle.trim()||text.trim())?C.blue:"ghost"),flex:1,opacity:(mTitle.trim()||text.trim())?1:0.45}} onClick={submit} disabled={!mTitle.trim()&&!text.trim()}>追加</button></div></div>):(<button style={fab} onClick={()=>setComposing(true)}>＋</button>)}
    </div>
  );
}
function MemoEditor({memo,onSave,onBack}){
  const[mTitle,setMTitle]=useState(memo?.title||"");
  const[text,setText]=useState(memo?.content||"");
  const canSave=mTitle.trim()||text.trim();
  return(<div style={scr}><div style={hdr}><button onClick={onBack} style={bkBtn}>← 戻る</button><span style={{fontSize:16,fontWeight:700,marginLeft:8,flex:1}}>メモを編集</span></div><div style={{padding:"18px 18px 0"}}><div style={{fontSize:11,color:C.textSub,fontWeight:700,marginBottom:6}}>タイトル</div><input style={{...inp,fontSize:16,fontWeight:700,marginBottom:14}} value={mTitle} onChange={e=>setMTitle(e.target.value)} placeholder="タイトル（任意）" autoFocus/><div style={{fontSize:11,color:C.textSub,fontWeight:700,marginBottom:6}}>詳細</div><textarea style={{...ta,minHeight:240}} value={text} onChange={e=>setText(e.target.value)} placeholder="メモ内容..."/><button style={{...btn(canSave?C.blue:"ghost"),marginTop:16,opacity:canSave?1:0.45}} onClick={()=>onSave(mTitle.trim(),text.trim())} disabled={!canSave}>保存</button></div></div>);
}

// ── Login Screen ──────────────────────────────────────────
function LoginScreen(){
  const[email,setEmail]=useState('');
  const[pass,setPass]=useState('');
  const[mode,setMode]=useState('login');
  const[busy,setBusy]=useState(false);
  const[err,setErr]=useState('');
  const[msg,setMsg]=useState('');
  const submit=async()=>{
    if(!email.trim()||!pass.trim()){setErr('メールアドレスとパスワードを入力してください');return;}
    setBusy(true);setErr('');setMsg('');
    try{
      if(mode==='login'){
        const error=null; // localStorage mode
        if(error)throw error;
      }else{
        const error=null; // localStorage mode
        if(error)throw error;
        setMsg('確認メールを送信しました。メールを開いて認証してください。');
      }
    }catch(e){
      const m=e.message||'';
      setErr(m.includes('Invalid login')?'メールアドレスまたはパスワードが違います':
             m.includes('already registered')?'このメールは既に登録済みです':
             m||'エラーが発生しました');
    }finally{setBusy(false);}
  };
  return(
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 24px'}}>
      <div style={{width:'100%',maxWidth:360}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:52,marginBottom:12}}>📒</div>
          <div style={{fontFamily:serif,fontSize:26,fontWeight:700,color:C.text,letterSpacing:'-0.01em'}}>投資ノート</div>
          <div style={{fontSize:13,color:C.textSub,marginTop:6}}>記録する、振り返る、成長する</div>
        </div>
        <div style={{...paperCard,padding:'24px 20px'}}>
          <div style={{display:'flex',marginBottom:20,border:`1.5px solid ${C.border}`,borderRadius:6,overflow:'hidden'}}>
            {[{k:'login',l:'ログイン'},{k:'signup',l:'新規登録'}].map(m=>(
              <button key={m.k} onClick={()=>{setMode(m.k);setErr('');setMsg('');}} style={{flex:1,padding:'9px',border:'none',cursor:'pointer',fontSize:13,fontWeight:600,background:mode===m.k?C.text:'transparent',color:mode===m.k?C.surface:C.textSub}}>
                {m.l}
              </button>
            ))}
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,color:C.textSub,fontWeight:700,marginBottom:5}}>メールアドレス</div>
            <input style={inp} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@email.com" autoFocus/>
          </div>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,color:C.textSub,fontWeight:700,marginBottom:5}}>パスワード{mode==='signup'&&<span style={{fontWeight:400,color:C.textMuted}}>（6文字以上）</span>}</div>
            <input style={inp} type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==='Enter'&&submit()}/>
          </div>
          {err&&<div style={{fontSize:13,color:C.red,marginBottom:14,padding:'8px 12px',background:C.red+'15',borderRadius:6}}>{err}</div>}
          {msg&&<div style={{fontSize:13,color:C.green,marginBottom:14,padding:'8px 12px',background:C.green+'15',borderRadius:6}}>{msg}</div>}
          <button style={{...btn(C.text,C.surface),opacity:busy?0.6:1}} onClick={submit} disabled={busy}>
            {busy?'処理中...':(mode==='login'?'ログイン':'アカウント作成')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────
export default function App(){
  const[notes,setNotes]=useState([]);
  const[loading,setLoading]=useState(true);
  const[user]=useState({id:'local'});
  const[authReady]=useState(true);
  const[view,setView]=useState("list");
  const[mainView,setMainView]=useState("notes");
  const[selectedId,setSelectedId]=useState(null);
  const[filter,setFilter]=useState("all");
  const[wizardMode,setWizardMode]=useState("entry");
  const[wizardStep,setWizardStep]=useState(0);
  const[wizardData,setWizardData]=useState({});
  const[holdingData,setHoldingData]=useState({});
  const[logDate,setLogDate]=useState(todayStr());
  const[logMemo,setLogMemo]=useState("");
  const[toast,setToast]=useState(false);
  const[confirmDeleteNote,setConfirmDeleteNote]=useState(false);
  const[learnData,setLearnData]=useState({sections:[],notes:[],memos:[]});
  const[selSectionId,setSelSectionId]=useState(null);
  const[selNoteId,setSelNoteId]=useState(null);
  const[editingMemo,setEditingMemo]=useState(null);

  useEffect(()=>{
    const el=document.createElement("style");
    el.textContent="@keyframes slideIn{from{transform:translateX(28px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}";
    document.head.appendChild(el);
    const font=document.createElement("link");
    font.rel="stylesheet";
    font.href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&display=swap";
    document.head.appendChild(font);
    return()=>{try{document.head.removeChild(el);document.head.removeChild(font);}catch{}};
  },[]);


  // ログイン後にデータ読み込み
  useEffect(()=>{
    if(!user){setLoading(false);return;}
    setLoading(true);
    dbLoad().then(({notes:n,learn:l})=>{
      setNotes((n||[]).map(x=>migrateNoteV2(x.status==="watching"?{...x,status:"holding"}:x)));
      const ld=migrateLearn(l);
      if(!ld||!ld.sections||ld.sections.length===0){
        setLearnData({sections:DEFAULT_SECTIONS.map(s=>({...s,createdAt:new Date().toISOString()})),notes:[],memos:[]});
      }else setLearnData(ld);
      setLoading(false);
    });
  },[user]);

  const save=useCallback(async(u)=>{setNotes(u);if(user)await dbSaveNotes(user.id,u);},[user]);
  const showToast=()=>{setToast(true);setTimeout(()=>setToast(false),2500);};
  const saveLearn=useCallback(async(d)=>{setLearnData(d);if(user)await dbSaveLearn(user.id,d);},[user]);

  const touchNote=(d,noteId)=>({...d,notes:d.notes.map(n=>n.id===noteId?{...n,updatedAt:new Date().toISOString()}:n)});
  const addSection=(name)=>saveLearn({...learnData,sections:[...learnData.sections,{id:uid(),name,color:SEC_PALETTE[learnData.sections.length%SEC_PALETTE.length],createdAt:new Date().toISOString()}]});
  const addNote=(sectionId)=>{const id=uid();const now=new Date().toISOString();saveLearn({...learnData,notes:[...learnData.notes,{id,sectionId,title:"新しいノート",pinned:false,createdAt:now,updatedAt:now}]});setSelNoteId(id);setView("learnNote");};
  const renameNote=(noteId,title)=>saveLearn({...learnData,notes:learnData.notes.map(n=>n.id===noteId?{...n,title,updatedAt:new Date().toISOString()}:n)});
  const togglePinNote=(noteId)=>saveLearn({...learnData,notes:learnData.notes.map(n=>n.id===noteId?{...n,pinned:!n.pinned}:n)});
  const deleteNote=(noteId)=>saveLearn({...learnData,notes:learnData.notes.filter(n=>n.id!==noteId),memos:learnData.memos.filter(m=>m.noteId!==noteId)});
  const addMemo=(noteId,title,content)=>{const now=new Date().toISOString();saveLearn(touchNote({...learnData,memos:[...learnData.memos,{id:uid(),noteId,title,content,createdAt:now}]},noteId));};
  const updateMemo=(memoId,title,content)=>{const m=learnData.memos.find(x=>x.id===memoId);saveLearn(touchNote({...learnData,memos:learnData.memos.map(x=>x.id===memoId?{...x,title,content}:x)},m?.noteId));};
  const deleteMemo=(memoId)=>{const m=learnData.memos.find(x=>x.id===memoId);saveLearn(touchNote({...learnData,memos:learnData.memos.filter(x=>x.id!==memoId)},m?.noteId));};
  const selSection=learnData.sections.find(s=>s.id===selSectionId);
  const selNote=learnData.notes.find(n=>n.id===selNoteId);

  const selectedNote=notes.find(n=>n.id===selectedId);
  const filteredNotes=filter==="all"?notes:notes.filter(n=>n.status===filter);
  const steps=wizardMode==="entry"?ENTRY_STEPS:EXIT_STEPS;

  const startEntryWizard=()=>{setWizardData({entryDate:todayStr()});setWizardStep(0);setWizardMode("entry");setView("wizard");};
  const startExitWizard=()=>{const rem=selectedNote?calcRemaining(selectedNote):0;setWizardData({exitDate:todayStr(),exitShares:rem?String(rem):''});setWizardStep(0);setWizardMode("exit");setView("wizard");};
  const handleWizardChange=(key,val)=>setWizardData(d=>({...d,[key]:val}));
  const handleWizardNext=()=>{
    if(wizardStep<steps.length-1){setWizardStep(s=>s+1);return;}
    if(wizardMode==="entry"){
      const note={
        id:uid(),ticker:wizardData.stock?.ticker||"",name:wizardData.stock?.name||"",
        status:"holding",createdAt:new Date().toISOString(),
        entry:{technical:wizardData.technical||"",fundamental:wizardData.fundamental||{selected:{},other:""},bullScenario:wizardData.bullScenario||{A:"",B:"",C:"",targetType:"N",freeText:""},bearScenario:wizardData.bearScenario||"",macro:wizardData.macro||""},
        buys:[{id:uid(),date:wizardData.entryDate,price:Number(wizardData.entryPrice),shares:wizardData.shares?Number(wizardData.shares):0}],
        sells:[],
        holding:{stopLoss:wizardData.stopLoss?Number(wizardData.stopLoss):null,takeProfit:wizardData.takeProfit?Number(wizardData.takeProfit):null,scenarioBreaker:"",logs:[]}
      };
      save([note,...notes]);setSelectedId(note.id);
    }else{
      const newSell={id:uid(),date:wizardData.exitDate,price:Number(wizardData.exitPrice),shares:Number(wizardData.exitShares)||0,reason:wizardData.exitReason||"",comparison:wizardData.comparison||"",lessons:wizardData.lessons||""};
      const updated=notes.map(n=>{
        if(n.id!==selectedId)return n;
        const newSells=[...(n.sells||[]),newSell];
        const rem=calcRemaining({...n,sells:newSells});
        return{...n,sells:newSells,status:rem<=0?"exited":"holding"};
      });
      save(updated);
    }
    setView("detail");
  };
  const openHoldingEdit=()=>{setHoldingData({stopLoss:selectedNote?.holding?.stopLoss||"",takeProfit:selectedNote?.holding?.takeProfit||"",scenarioBreaker:selectedNote?.holding?.scenarioBreaker||""});setView("holding");};
  const saveHolding=()=>{save(notes.map(n=>n.id!==selectedId?n:{...n,status:"holding",holding:{...n.holding,stopLoss:holdingData.stopLoss?Number(holdingData.stopLoss):n.holding?.stopLoss,takeProfit:holdingData.takeProfit?Number(holdingData.takeProfit):n.holding?.takeProfit,scenarioBreaker:holdingData.scenarioBreaker}}));setView("detail");};
  const deleteBuyTx=(buyId)=>save(notes.map(n=>n.id!==selectedId?n:{...n,buys:(n.buys||[]).filter(b=>b.id!==buyId)}));
  const deleteSellTx=(sellId)=>{
    const updated=notes.map(n=>{
      if(n.id!==selectedId)return n;
      const newSells=(n.sells||[]).filter(sv=>sv.id!==sellId);
      const rem=calcRemaining({...n,sells:newSells});
      return{...n,sells:newSells,status:rem<=0&&newSells.length>0?'exited':'holding'};
    });
    save(updated);
  };
  const deleteInvestNote=()=>{save(notes.filter(n=>n.id!==selectedId));setConfirmDeleteNote(false);setView('list');setSelectedId(null);};
  const saveLog=()=>{if(!logMemo.trim())return;save(notes.map(n=>n.id!==selectedId?n:{...n,holding:{...n.holding,logs:[...(n.holding?.logs||[]),{id:uid(),date:logDate,memo:logMemo.trim()}]}}));setLogMemo("");setLogDate(todayStr());setView("detail");};

  if(!authReady||loading) return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12}}>
      <div style={{fontSize:40}}>📒</div>
      <div style={{color:C.textSub,fontSize:14}}>読み込み中...</div>
    </div>
  );

  if(view==="wizard") return (
    <WizardView steps={steps} stepIdx={wizardStep} data={wizardData}
      onChange={handleWizardChange} onNext={handleWizardNext}
      onBack={()=>{if(wizardStep>0)setWizardStep(s=>s-1);else setView(selectedId?"detail":"list");}}
      title={wizardMode==="entry"?"新規ノート作成（"+ENTRY_STEPS.length+"問）":"売却記録（"+EXIT_STEPS.length+"問）"}/>
  );
  if(view==="holding") return (
    <HoldingEditView data={holdingData} onChange={(k,v)=>setHoldingData(d=>({...d,[k]:v}))} onSave={saveHolding} onBack={()=>setView("detail")}/>
  );
  if(view==="addlog") return (
    <AddLogView date={logDate} memo={logMemo} onDateChange={setLogDate} onMemoChange={setLogMemo} onSave={saveLog} onBack={()=>setView("detail")}/>
  );
  if(view==="detail"&&selectedNote) return (
    <DetailView note={selectedNote} toast={toast} onBack={()=>setView("list")} onEditHolding={openHoldingEdit}
      onAddLog={()=>{setLogMemo("");setLogDate(todayStr());setView("addlog");}}
      onAddBuy={()=>setView("addBuy")} onAddSell={startExitWizard}
      onDeleteBuy={deleteBuyTx} onDeleteSell={deleteSellTx}
      onDeleteNote={()=>setConfirmDeleteNote(true)}
      onExport={()=>{navigator.clipboard?.writeText(toMarkdown(selectedNote)).catch(()=>{});showToast();}}/>
  );
  if(view==="addBuy"&&selectedNote) return (
    <AddBuyView
      onSave={(b)=>{const updated=notes.map(n=>n.id!==selectedId?n:{...n,buys:[...(n.buys||[]),{id:uid(),...b}]});save(updated);setView("detail");}}
      onBack={()=>setView("detail")}/>
  );
  if(view==="learnSection"&&selSection) return (
    <SectionView section={selSection} notes={learnData.notes} memos={learnData.memos}
      onBack={()=>setView("list")} onAddNote={()=>addNote(selSection.id)}
      onOpenNote={(n)=>{setSelNoteId(n.id);setView("learnNote");}}/>
  );
  if(view==="learnNote"&&selNote) return (
    <NoteView note={selNote} memos={learnData.memos} accent={selSection?.color}
      onBack={()=>setView("learnSection")} onAddMemo={(t,c)=>addMemo(selNote.id,t,c)}
      onEditMemo={(m)=>{setEditingMemo(m);setView("learnMemoEdit");}}
      onDeleteMemo={deleteMemo} onRenameNote={(t)=>renameNote(selNote.id,t)}
      onTogglePin={()=>togglePinNote(selNote.id)}
      onDeleteNote={()=>{deleteNote(selNote.id);setView("learnSection");}}/>
  );
  if(view==="learnMemoEdit"&&editingMemo) return (
    <MemoEditor memo={editingMemo}
      onSave={(t,c)=>{updateMemo(editingMemo.id,t,c);setView("learnNote");}}
      onBack={()=>setView("learnNote")}/>
  );
  return (
    <>
      {mainView==="notes"
        ? <ListView notes={filteredNotes} allNotes={notes} filter={filter} onFilter={setFilter} onSelect={id=>{setSelectedId(id);setView("detail");}} onNew={startEntryWizard}/>
        : mainView==="pnl"
          ? <PnLScreen notes={notes} onSelectNote={id=>{setSelectedId(id);setView("detail");}}/>
          : <LearningHome data={learnData} onOpenSection={(s)=>{setSelSectionId(s.id);setView("learnSection");}} onAddSection={addSection} onOpenNote={(n)=>{setSelSectionId(n.sectionId);setSelNoteId(n.id);setView("learnNote");}}/>
      }
      <BottomNav active={mainView} onChange={setMainView}/>
      {confirmDeleteNote&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{background:C.surface,borderRadius:"16px 16px 0 0",padding:"28px 20px 44px",width:"100%",maxWidth:480,borderTop:`3px solid ${C.red}`}}>
            <div style={{fontFamily:serif,fontSize:19,fontWeight:700,marginBottom:8,color:C.text}}>本当に削除しますか？</div>
            <div style={{fontSize:14,color:C.textSub,marginBottom:24,lineHeight:1.65}}>
              「{selectedNote?.name}」のすべての記録を完全に削除します。<br/>この操作は取り消せません。
            </div>
            <button style={{...btn(C.red,"#fff"),marginBottom:10}} onClick={deleteInvestNote}>削除する</button>
            <button style={btn("ghost")} onClick={()=>setConfirmDeleteNote(false)}>キャンセル</button>
          </div>
        </div>
      )}
    </>
  );
}
