'use strict';
const config = window.SITE_CONFIG || {};
const copyUpdates = {
 ru: {heroEyebrow:'ПУТЕШЕСТВИЯ С ДРУГИМ ГОРИЗОНТОМ',heroTitle:'Ваш мир.<br><em>Без привычных границ.</em>',heroText:'Просыпаться в новом городе. Смотреть на океан с собственной террасы. Найдите свой формат путешествий с клубом inCruises.',heroPlans:'Выбрать свой план',heroMeta:'КРУИЗЫ / ОТЕЛИ / ВПЕЧАТЛЕНИЯ',heroVideo:'Познакомиться с клубом',videoText:'Короткое знакомство с клубом и форматом членства.',introText:'Клуб путешествий объединяет круизы, отели, курорты и туры. Вы выбираете план участия и используете доступные ему возможности бронирования и Reward Points.',stat3:'уровни платного членства',ctaEyebrow:'ДАЛЬШЕ — ВАШ МАРШРУТ',ctaTitle:'Хорошее путешествие<br><em>начинается с выбора.</em>',ctaText:'Найдите подходящий план или обсудите вопросы о членстве. Первый шаг к новым впечатлениям можно сделать уже сейчас.',registerEyebrow:'ВАШ СЛЕДУЮЩИЙ ШАГ',registerText:'Познакомьтесь с планами членства, задайте вопросы и переходите к регистрации, когда выберете подходящий формат.',reg3:'Оформите участие',reg3Text:'Перейдите к регистрации и выберите подходящий план членства.',plansAside:'Сравните стартовую сумму, ежемесячный платёж и возможности каждого уровня.',sourceText:'Итоговая стоимость путешествия зависит от маршрута, каюты, дат и доступности. Перед оплатой уточните сборы, налоги и правила отмены выбранного бронирования.',a6:'Перед оплатой уточните итоговую стоимость, сборы, доступность выбранного путешествия и правила отмены.',footerDisclaimer:'Круизы, отели и впечатления. Личная презентация независимого партнёра inCruises.',startingCost:'Стартовая сумма',signupPoints:'Баллы при регистрации',monthly:'Ежемесячный платёж',bookings:'Бронирования INsider Pricing в год',upgradable:'Повышение плана',rpHotel:'INsider Pricing: снижение цены',rpCruise:'Reward Points: покрытие стоимости круиза',premiumBooking:'Премиальные поставщики путешествий',downgrade:'Понижение плана',insiderText:'INsider Pricing открывает участникам клуба предложения со снижением цены до 17%. Итоговая стоимость зависит от маршрута, выбранного размещения и доступности.'},
 en: {heroEyebrow:'TRAVEL WITH A DIFFERENT HORIZON',heroTitle:'Your world.<br><em>Beyond the familiar.</em>',heroText:'Wake up in a different city. Watch the ocean from your own balcony. Find your way to travel with inCruises.',heroPlans:'Find your membership',heroMeta:'CRUISES / HOTELS / EXPERIENCES',heroVideo:'Discover the club',videoText:'A short introduction to the club and membership.',introText:'A travel club bringing together cruises, hotels, resorts and tours. Choose a membership plan and explore its booking options and Reward Points.',stat3:'paid membership levels',ctaEyebrow:'YOUR NEXT HORIZON',ctaTitle:'Every great journey<br><em>starts with a choice.</em>',ctaText:'Find a plan that suits you or discuss your membership questions. Take the first step towards a new experience.',registerEyebrow:'YOUR NEXT STEP',registerText:'Explore membership plans, ask questions and start registration when you find your format.',reg3:'Become a member',reg3Text:'Continue to registration and choose a membership plan.',plansAside:'Compare starting costs, monthly payments and the features of each level.',sourceText:'The total travel price depends on the itinerary, cabin, dates and availability. Check fees, taxes and cancellation terms before payment.',a6:'Confirm the total cost, fees, availability and cancellation terms before paying.',footerDisclaimer:'Cruises, hotels and experiences. A personal presentation by an independent inCruises partner.',guard1Title:'Using Reward Points',guard1Text:'Reward Points can cover up to 50% of a cruise retail price under program rules. The result depends on your booking.'}
};
for (const lang of ['ru','en']) Object.assign(translations[lang],copyUpdates[lang]);
let language = 'ru';
try { language = localStorage.getItem('in_lang') === 'en' ? 'en' : 'ru'; } catch (_) {}
const t = (ru,en) => language === 'ru' ? ru : en;
function safeUrl(value) { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : ''; } catch (_) { return ''; } }
function whatsappUrl() { const phone=String(config.whatsapp||'').replace(/\D/g,''); return /^\d{8,15}$/.test(phone) ? 'https://wa.me/'+phone : ''; }
function translate() {
 document.documentElement.lang=language;
  document.querySelectorAll('[data-href-ru][data-href-en]').forEach(link => {
   link.href = link.getAttribute('data-href-' + language);
   link.hreflang = language;
 });
 document.querySelectorAll('[data-i18n]').forEach(el=>{const v=translations[language][el.dataset.i18n];if(v!==undefined)el.innerHTML=v;});
 document.querySelectorAll('[data-ru]').forEach(el=> { if(el.tagName==='OPTION')el.textContent=el.dataset[language];else el.innerHTML=el.dataset[language]; });
 document.querySelectorAll('.lang-toggle').forEach(btn=>{btn.textContent=language==='ru'?'EN':'RU';btn.setAttribute('aria-label',t('Switch to English','Переключить на русский'));});
 document.querySelectorAll('.menu-toggle').forEach(btn=>btn.setAttribute('aria-label',t('Меню','Menu')));
 document.querySelectorAll('textarea[name="message"]').forEach(el=>el.placeholder=t('Например: хочу круиз на двоих осенью','For example: an autumn cruise for two'));
 document.querySelectorAll('.table-wrap td').forEach(el=>{if(['Yes','Да'].includes(el.textContent))el.textContent=t('Да','Yes');if(['Unlimited','Без лимита'].includes(el.textContent))el.textContent=t('Без лимита','Unlimited');});
 document.querySelectorAll('.form-status').forEach(el=>el.textContent='');
 const path=(config.membershipVideos||{})[language]||('videos/intro-'+language+'-short.mp4');
 const video=document.getElementById('membership-video');
 if(video){
  if(video.getAttribute('src')!==path){video.pause();video.src=path;video.load();}
  video.setAttribute('aria-label',t('Знакомство с клубом inCruises — русский','Introduction to inCruises — English'));
 }
 const status=document.getElementById('membership-video-status');if(status){status.hidden=true;status.textContent='';}
 const watch=document.getElementById('watch-video-link');if(watch)watch.href=path;
 updateBudget();
}
function updateBudget(){
 const select=document.getElementById('plan-select');if(!select)return;
 const plans={Guest:[0,0],Starter:[50,50],Classic:[200,100],Premium:[500,250]};const months=Number(document.getElementById('months').value);const [start,monthly]=plans[select.value];
 document.getElementById('months-output').textContent=months+' '+t('мес.','months');
 document.getElementById('budget-total').textContent='$'+(start+monthly*(months-1)).toLocaleString(language==='ru'?'ru-RU':'en-US');
 document.getElementById('budget-breakdown').textContent='$'+start+' + $'+monthly+' × '+(months-1);
}
function setupMenu(){
 const button=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');if(!button||!nav)return;
 const close=()=>{document.body.classList.remove('menu-open');button.setAttribute('aria-expanded','false');};
 button.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');button.setAttribute('aria-expanded',String(open));});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();button.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))close();});
 window.matchMedia('(min-width:721px)').addEventListener('change',e=>{if(e.matches)close();});
 nav.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop())a.setAttribute('aria-current','page');});
}
function setupLinks(){
 const referral=safeUrl(config.referralLink);
 document.querySelectorAll('[data-register]').forEach(el=>{el.href=referral||'register.html#contact';if(referral){el.target='_blank';el.rel='noopener noreferrer';}});
 document.querySelectorAll('.register-button').forEach(el=>{if(!referral)el.innerHTML=t('Задать вопрос ↗','Ask a question ↗');});
 const wa=whatsappUrl();const instagram=String(config.instagram||'').trim();const ig=instagram.startsWith('https://')?safeUrl(instagram):(/^[\w.]+$/.test(instagram.replace(/^@/,''))?'https://www.instagram.com/'+instagram.replace(/^@/,'')+'/':'');
 for(const [selector,url] of [['[data-whatsapp]',wa],['[data-instagram]',ig]])document.querySelectorAll(selector).forEach(el=>{el.hidden=!url;if(url){el.href=url;el.target='_blank';el.rel='noopener noreferrer';}});
 document.querySelectorAll('.contact-note').forEach(el=>el.hidden=!wa);
 const name=String(config.consultantName||'').trim();
 if(name){
  document.querySelectorAll('.brand-copy small').forEach(el=>el.textContent=name);
  document.querySelectorAll('[data-consultant-name]').forEach(el=>el.textContent=name);
  document.querySelectorAll('.consultant-initial').forEach(el=>el.textContent=name.charAt(0).toUpperCase());
 }
 document.querySelectorAll('.consultant-img').forEach(el=>el.setAttribute('alt',name?t(name+' — ваш консультант по членству',name+' — your membership consultant'):t('Ваш консультант по членству','Your membership consultant')));
}
function setupConsultant(){
 document.querySelectorAll('.consultant-img').forEach(img=>{
  const hide=()=>{img.hidden=true;};
  if(img.complete&&img.naturalWidth===0)hide();else img.addEventListener('error',hide,{once:true});
 });
}
function setupForms(){
 document.querySelectorAll('.inquiry-form').forEach(form=>form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const status=form.querySelector('.form-status'),wa=whatsappUrl();
  if(!wa){status.textContent=t('Контакт для консультации пока не указан. Отправка недоступна.','A consultation contact has not been added yet. Sending is unavailable.');return;}
  const data=new FormData(form);const interest=form.querySelector('select').selectedOptions[0].textContent;
  const message=t('Здравствуйте! Меня зовут ','Hello! My name is ')+String(data.get('name')).trim()+'.\n'+t('Интересует: ','Interested in: ')+interest+'.\n'+String(data.get('message')).trim();
  const opened=window.open(wa+'?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
  status.textContent=t('Сообщение подготовлено. Отправьте его в WhatsApp.','Your message is ready. Send it in WhatsApp.');
 }));
}
function setupVideo(){
 const video=document.querySelector('video.hero-video');if(!video)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const saveData=navigator.connection&&navigator.connection.saveData;
 const button=document.querySelector('.video-toggle');
 if(config.videoPoster){video.poster=config.videoPoster;const fallback=document.querySelector('.hero-video-fallback');if(fallback)fallback.style.backgroundImage='url("'+String(config.videoPoster).replace(/["\\]/g,'')+'")';}
 if(reduced||saveData)return;
 video.src=config.videoPath||'videos/bg.mp4';video.muted=true;
 video.addEventListener('playing',()=>{video.classList.add('video-ready');button.hidden=false;});
 video.addEventListener('error',()=>{video.classList.remove('video-ready');button.hidden=true;});
 video.play().catch(()=>{button.hidden=false;button.textContent='▶';});
 button.addEventListener('click',()=>{if(video.paused){video.play().then(()=>{button.textContent='Ⅱ';button.setAttribute('aria-label',t('Приостановить фон','Pause background'));}).catch(()=>{button.hidden=true;});}else{video.pause();button.textContent='▶';button.setAttribute('aria-label',t('Включить фон','Play background'));}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&!video.paused){video.pause();button.textContent='▶';}});
}
function setupMembershipVideo(){
 const video=document.getElementById('membership-video');if(!video)return;
 const status=document.getElementById('membership-video-status');
 video.addEventListener('error',()=>{if(status){status.hidden=false;status.textContent=t('Не удалось загрузить видео. Попробуйте открыть его по ссылке ниже.','The video could not be loaded. Try the link below.');}});
 video.addEventListener('loadeddata',()=>{if(status)status.hidden=true;});
}
function setupReveals(){document.documentElement.classList.add('js-ready');const items=document.querySelectorAll('.reveal');if(!('IntersectionObserver'in window)){items.forEach(e=>e.classList.add('is-visible'));return;}
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.08});items.forEach(e=>observer.observe(e));}
function setupFilters(){document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('[data-category]').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter);}));}
document.addEventListener('DOMContentLoaded',()=>{
 translate();setupMenu();setupLinks();setupConsultant();setupForms();setupVideo();setupMembershipVideo();setupReveals();setupFilters();
 document.querySelectorAll('.lang-toggle').forEach(btn=>btn.addEventListener('click',()=>{language=language==='ru'?'en':'ru';try{localStorage.setItem('in_lang',language);}catch(_){}translate();setupLinks();}));
 ['plan-select','months'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('input',updateBudget);});
 const top=document.querySelector('.back-to-top');const scroll=()=>{top.hidden=scrollY<700;document.querySelector('.site-header').classList.toggle('scrolled',scrollY>40);};window.addEventListener('scroll',scroll,{passive:true});scroll();top.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
});
