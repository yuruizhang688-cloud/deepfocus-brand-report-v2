import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {marked} from './vendor/marked.esm.js';
const root=path.dirname(fileURLToPath(import.meta.url)), dist=path.join(root,'dist');
const source=fs.readFileSync(path.join(root,'source-report.md'),'utf8');
let copy=source;
const edits=[
['这个排序不是主观偏好，而是基于一个关键判断：**东亚和东南亚市场的 AI 搜索，本地语言信源的权重远高于英文信源。** 这正是中国品牌最薄弱、也最需要专业支持的环节（详见 §3.6）。','这是 DeepFocus 的业务优先级。进入具体市场前，需要验证目标语言的问题集、当地信源和平台使用情况；本地化交付方法见 §3.5。'],
['**我们没有标准品，所有服务均为定制化交付。**','**所有服务均为定制化交付。**'],
['这不是姿态，而是判断：每个品牌的行业结构、竞争位置、信源现状、目标市场语言都不同，套用模板只能得到均质化的结果。','行业竞争、品牌已有内容和目标市场语言决定了工作量。方案与报价根据具体需求确定。'],
['这是我们最不愿意妥协的一条。','团队配置与并行项目数量是报告列出的交付原则。'],
['**这是 DeepFocus 与"内容代发"最本质的分野——别人从内容出发，我们从问题出发。**','我们先整理用户问题，再决定内容需要覆盖哪些事实与场景。'],
['**这是我们与"截图式交付"最本质的区别。**',''],
['让每一条数据都能被复现','支持按约定口径独立复测'],
['**这是国内 GEO 团队做海外时最容易失败的地方。**','目标市场的语言、信源与平台需要分别研究。'],
['机器翻译内容会被 AI 平台识别，推荐频率显著低于母语内容','语言与用户意图、术语及本地表达不匹配'],
['没有本地信源，AI 只能引用英文来源或竞品，品牌无法进入答案','目标市场中的可引用依据不足'],
['只做全球引擎，等于放弃本地市场约一半的 AI 曝光','未覆盖当地独立入口，监测范围可能不完整'],
['### 4.1 10 赛道客户案例集','### 4.1 案例资料 · 本版收录 5 项'],
['本节完整收录所提供《10赛道客户案例集_对外版》的案例信息、数值、周期和客户引语。','本版收录所提供《10赛道客户案例集_对外版》中的 5 项案例信息、数值、周期和客户引语。'],
['**核心策略：用 60% 的塔基词做内容密度，30% 的塔身词刷专业权重，最终 10% 的塔尖词实现最大可见度转化。**','**关键词规划参考比例为 60%／30%／10%，分别覆盖塔基词、对比词与高竞争词。这是配置建议，不是实测流量或转化比例。**'],
['通常 4-8 周开始出现变化，3-6 个月趋于稳定。前 1-2 周属于品牌信息标准化阶段','报告给出的参考预期是 4～8 周开始出现变化，3～6 个月趋于稳定。前 1～2 周属于品牌信息标准化阶段'],
['第 1-2 周','第 1～2 周'],['第 3-4 周','第 3～4 周'],['第 5-8 周','第 5～8 周'],['第 3-6 个月','第 3～6 个月']
];
for(const [a,b] of edits)copy=copy.replace(a,b);
copy=copy.replace('【R2242104720@163.com】','[R2242104720@163.com](mailto:R2242104720@163.com)').replace('【+86 17820394809】','[+86 17820394809](tel:+8617820394809)').replace('【https://www.deepfocusglobal.com】','[deepfocusglobal.com ↗](https://www.deepfocusglobal.com)');
copy=copy.replace(/- \*\*韩国\*\*：[^\n]+/,'- **韩国**：ChatGPT 与 Naver 的搜索生态需要分别研究；按约定的问题集检查当地入口及其信源。')
.replace(/- \*\*日本\*\*：[^\n]+/,'- **日本**：重点检查日语问题下的本地来源，包括新闻媒体、问答站点和垂直内容。英文内容资产需要做本地适配。')
.replace(/不行。机器翻译能解决字面正确[^\n]+/,'机器翻译可辅助初稿，但交付内容仍需核对用户意图、术语、价格与单位、合规声明和本地信任信号。每个市场需要独立审校。')
.replace(/不够。以韩国为例[^\n]+/,'覆盖范围按目标市场确定。当地若有独立的 AI 搜索入口，需要单独研究，不能只沿用全球引擎的问题集。')
.replace(/迁移效率很低。日韩的 AI 搜索[^\n]+/,'英文资产可以提供品牌事实基础。进入日本、韩国时，还需建立对应语言的内容与当地信源，并检验实际引用情况。')
.replace(/\| ChatGPT\s+\|[^\n]+/,'| ChatGPT | 全球引擎，按目标市场与场景纳入监测 |')
.replace(/\| Google AI Overviews\s+\|[^\n]+/,'| Google AI Overviews | Google 搜索中的 AI 答案入口 |')
.replace(/\| Gemini\s+\|[^\n]+/,'| Gemini | 按目标市场与场景纳入监测 |');
fs.writeFileSync(path.join(root,'site-content.md'),copy);
fs.copyFileSync(path.join(root,'source-report.md'),path.join(dist,'assets/DeepFocus-brand-report-v2-original.md'));
const chapters=copy.split(/^## /m).slice(2);
const ids=['brand','business','method','cases','faq','contact'], titles=['品牌介绍','主营业务','核心方法论','案例资料','行业 FAQ','联系与附录'];
function chartFlow(){return `<figure id="delivery-system" class="mechanism"><figcaption><span class="section-label">DELIVERY SYSTEM</span><h3>诊断到迭代，用约定口径验证每个阶段</h3></figcaption><div class="flow">${[['01','系统诊断','基线 · 认知画像'],['02','针对性策略','场景矩阵 · 实施计划'],['03','内容与信源','知识库 · 原生内容'],['04','共建 KPI','独立复测 · 趋势对比'],['05','持续迭代','竞品追踪 · 周期复盘']].map((a,i)=>`<div class="flow-node"><span>${a[0]}</span><strong>${a[1]}</strong><small>${a[2]}</small>${i<4?'<b aria-hidden="true">→</b>':''}</div>`).join('')}</div><p class="caption">来源：品牌报告 §3.2。箭头表示交付顺序；复盘所得用于下一轮诊断与策略。</p></figure>`}
function chartMix(){return `<figure id="keyword-structure" class="mechanism"><figcaption><span class="section-label">KEYWORD STRUCTURE</span><h3>内容基础、比较问题与高竞争场景的配置</h3></figcaption><div class="mix" role="img" aria-label="关键词规划参考：塔基词百分之六十，对比词百分之三十，高竞争词百分之十"><div style="width:60%"><b>60%</b><span>塔基词 · 专业基础</span></div><div style="width:30%"><b>30%</b><span>对比词</span></div><div style="width:10%"><b>10%</b><span>高竞争词</span></div></div><p class="caption">来源：品牌报告 §3.3.4。这是规划参考比例，不代表实测流量、AI 推荐率或客户转化率。</p></figure>`}
let body=chapters.map((chapter,i)=>{
 let md=chapter.slice(chapter.indexOf('\n')+1).replace(/\n---\n/g,'\n');
 md=md.replace(/\*\*([^*\n]+[：:])\*\*/g,'<strong>$1</strong>');
 if(i===4)md=md.replace(/\*\*([ABC]\d+\. [^\n]+?)\*\*\s*([\s\S]*?)(?=\n\*\*[ABC]\d+\.|\n### |$)/g,(_,q,a)=>`<details class="faq"><summary>${q}</summary><div class="detail-content">${marked.parse(a.trim())}</div></details>\n\n`);
 let html=marked.parse(md,{gfm:true});
 html=html.replace(/<td>([+−\-]?[\d,.]+(?:%|pt)?)<\/td>/g,'<td class="numeric">$1</td>');
 html=html.replace(/<table>/g,'<div class="table-wrap"><table>').replace(/<\/table>/g,'</table></div>');
 if(i===2){html=html.replace('<h3>3.2 五阶段交付体系</h3>',chartFlow()+'<h3>3.2 五阶段交付体系</h3>');html=html.replace('<h4>3.3.4 关键词结构：60 / 30 / 10 金字塔</h4>','<h4>3.3.4 关键词结构：60 / 30 / 10 金字塔</h4>'+chartMix());html=html.replace('<h3>3.6 交付节奏与合理预期</h3>','<h3>3.6 交付节奏与合理预期</h3><p class="notice">以下时间为原报告的参考预期，不构成固定见效周期或效果保证。实际表现需要按项目采样验证。</p>')}
 if(i===3){html=html.replace(/(<h4>(\d{2} · [\s\S]*?)<\/h4>)([\s\S]*?)(?=<h4>|<h3>|$)/g,(_,h,t,c)=>`<details class="case"><summary><span>${t}</span><span class="tag">待核验</span></summary><div class="detail-content"><p class="caption">本项为原稿案例资料，数值、周期及引语尚待原始记录与披露授权核验。</p>${c}</div></details>`);}

 if(i===5)html=html.replace('【R2242104720@163.com】','<a href="mailto:R2242104720@163.com">R2242104720@163.com ↗</a>').replace('【+86 17820394809】','<a href="tel:+8617820394809">+86 17820394809</a>').replace('【<a href="https://www.deepfocusglobal.com">https://www.deepfocusglobal.com</a>】','<a href="https://www.deepfocusglobal.com" target="_blank" rel="noopener">deepfocusglobal.com ↗</a>');
 return `<section id="${ids[i]}" data-chapter="${i}" class="chapter"><div class="chapter-heading"><span class="section-label">CHAPTER 0${i+1}</span><h2>${titles[i]}</h2></div><div class="prose">${html}</div></section>`;
}).join('');
const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="DeepFocus 深度聚焦品牌报告 v2.0：全球 GEO 业务、交付方法论、指标验证与案例资料。"><title>DeepFocus · 品牌报告 v2.0</title><link rel="stylesheet" href="assets/report.css"><script src="assets/report.js" defer></script></head><body><a class="skip" href="#brand">跳转到报告正文</a><header class="topbar"><a class="wordmark" href="#top" aria-label="DeepFocus 深度聚焦"><svg class="brand-mark" viewBox="0 0 190 190" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M 4.5 185.5 L 4.5 4.5 L 127.5 4.5 A 96.5 96.5 0 0 1 116.5 185.5 Z"/><path d="M 32.5 83.5 L 32.5 72.5 A 24 24 0 0 1 56.5 48.5 L 140.5 48.5 C 140.5 62 134 76 120 83.5 Z"/><path d="M 117 83.5 L 117 100 A 20 20 0 0 1 100.92 119.61 L 56 127 A 25.5 25.5 0 0 0 35.5 152 L 35.5 185.5"/></svg><span class="brand-word">DeepFocus</span><span class="brand-cn">深度聚焦</span></a><div class="top-meta">BRAND REPORT <span>V2.0 / OCT 2026</span></div><a class="top-action" href="#contact">商务联系 ↗</a></header><div class="progress" aria-hidden="true"><div></div></div><main id="top"><div class="hero"><div class="hero-main"><p class="section-label">DEEPFOCUS · BRAND REPORT</p><h1><span>让好的品牌</span><br><span>在 AI 时代，</span><br><span class="hero-emphasis">不止于被看见和推荐。</span></h1><p class="hero-copy">面向全球品牌市场的 GEO 服务商。<br>从真实用户意图出发，建设可信的品牌内容与信源，持续观察品牌在 AI 答案中的呈现。</p><div class="hero-actions"><a class="button" href="#brand">阅读品牌报告 <span>↓</span></a><a class="text-link" href="assets/DeepFocus-brand-report-v2-original.md" download>下载 v2.0 原稿 ↗</a></div></div><aside class="hero-side"><p class="eyebrow">OUR APPROACH</p><h2>出现只是第一步。</h2><p>AI 是否把品牌说对？<br>是否在适合的场景提及？<br>用户能否找到可靠依据？</p><dl><div><dt>业务重心</dt><dd>海外市场，覆盖国内平台</dd></div><div><dt>交付方式</dt><dd>按市场与语言定制</dd></div><div><dt>验证原则</dt><dd>固定问题集，周期采样</dd></div></dl></aside></div><div class="report-meta"><span>2026 年 10 月 · 品牌报告</span><span>6 个章节 · 案例资料待核验</span></div><div class="reading-layout"><aside class="toc"><p class="eyebrow">CONTENTS / 目录</p><nav aria-label="报告章节">${ids.map((id,i)=>`<a href="#${id}" data-nav="${id}"><span>0${i+1}</span>${titles[i]}</a>`).join('')}</nav><div class="toc-note"><span class="tag">v2.0</span><p>方法与服务信息来自品牌报告。<br>案例资料不代表已证实业绩。</p><a href="#top">返回顶部 ↑</a></div></aside><article class="report">${body}</article></div></main><footer><a class="wordmark" href="#top" aria-label="DeepFocus 深度聚焦"><svg class="brand-mark" viewBox="0 0 190 190" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M 4.5 185.5 L 4.5 4.5 L 127.5 4.5 A 96.5 96.5 0 0 1 116.5 185.5 Z"/><path d="M 32.5 83.5 L 32.5 72.5 A 24 24 0 0 1 56.5 48.5 L 140.5 48.5 C 140.5 62 134 76 120 83.5 Z"/><path d="M 117 83.5 L 117 100 A 20 20 0 0 1 100.92 119.61 L 56 127 A 25.5 25.5 0 0 0 35.5 152 L 35.5 185.5"/></svg><span class="brand-word">DeepFocus</span><span class="brand-cn">深度聚焦</span></a><p>帮助品牌占领 AI 的注意力</p><a href="mailto:R2242104720@163.com">R2242104720@163.com ↗</a></footer></body></html>`;
const cssVersion=createHash('sha256').update(fs.readFileSync(`${dist}/assets/report.css`)).update(fs.readFileSync(`${dist}/assets/deepfocus-tokens.css`)).digest('hex').slice(0,12);
const jsVersion=createHash('sha256').update(fs.readFileSync(`${dist}/assets/report.js`)).digest('hex').slice(0,12);
const publishedHtml=html.replace('href="assets/report.css"',`href="assets/report.css?v=${cssVersion}"`).replace('src="assets/report.js"',`src="assets/report.js?v=${jsVersion}"`);
fs.writeFileSync(`${dist}/index.html`,publishedHtml);
fs.writeFileSync(`${dist}/.nojekyll`,'');
const hostingPath=path.join(root,'.openai/hosting.json');
if(fs.existsSync(hostingPath)){const manifest=JSON.parse(fs.readFileSync(hostingPath));manifest.static={directory:'dist'};fs.writeFileSync(hostingPath,JSON.stringify(manifest,null,2)+'\n');}
console.log(JSON.stringify({chapters:chapters.length,caseCount:(html.match(/class="case"/g)||[]).length,faqCount:(html.match(/class="faq"/g)||[]).length,bytes:Buffer.byteLength(publishedHtml)}));
