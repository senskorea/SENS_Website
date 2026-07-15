import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

type Lang = "en" | "kr";

const EMAIL = "info@sensai.cc";

const sectionsByLang: Record<Lang, { id: string; title: string }[]> = {
  en: [
    { id: "executive-summary", title: "1. Executive Summary" },
    { id: "the-problem", title: "2. The Problem" },
    { id: "the-solution", title: "3. The Solution" },
    { id: "market", title: "4. Market Analysis" },
    { id: "tech", title: "5. Technical Specifications" },
    { id: "roadmap", title: "6. Roadmap, Financials & The Ask" },
    { id: "conclusion", title: "Conclusion & Next Steps" },
  ],
  kr: [
    { id: "executive-summary", title: "1. Executive Summary" },
    { id: "the-problem", title: "2. 문제 정의" },
    { id: "the-solution", title: "3. 솔루션" },
    { id: "market", title: "4. 시장 분석" },
    { id: "tech", title: "5. 기술 사양" },
    { id: "roadmap", title: "6. 로드맵, 재무 계획 및 투자 유치" },
    { id: "conclusion", title: "결론 및 다음 단계" },
  ],
};

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-16 mb-6 scroll-mt-24"
  >
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mt-8 mb-3">
    {children}
  </h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base leading-relaxed text-muted-foreground mb-4">{children}</p>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4 marker:text-primary/60">
    {children}
  </ul>
);

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-foreground">{children}</strong>
);

const en = {
  title: "The Connection Layer for In-Person Events",
  subtitle:
    "Events sell serendipity. SENS makes it happen — turning every room into a live network of verified, face-to-face connections.",
};

const kr = {
  title: "오프라인 이벤트를 위한 커넥션 레이어",
  subtitle:
    "행사는 우연한 만남을 팝니다. SENS는 그것을 실제로 만듭니다 — 행사장 전체를 검증된 대면 커넥션의 라이브 네트워크로 바꿉니다.",
};

const EnContent = () => (
  <>
    <H2 id="executive-summary">1. Executive Summary</H2>
    <P>
      Events sell serendipity, but they rarely deliver it. At a typical 200-person conference, most
      people leave with the exact same contacts they walked in with. The room is full of the right
      people; they just don't know who they are, and they don't have a way to find out before
      everyone goes home.
    </P>
    <P>
      SENS fixes this. We turn the room into a network. It is a mobile web platform that matches
      attendees live and rewards them for having actual face-to-face conversations. In our pilots,
      people made <B>8 or more real connections</B> (triple the industry average), scored the
      experience <B>9.5 out of 10</B>, and <B>100%</B> said they would attend again.
    </P>
    <P>It is primarily built as a web app, so nobody has to download anything.</P>
    <P>This whitepaper explains how SENS works, the market we are tackling, and the business model behind it.</P>

    <H2 id="the-problem">2. The Problem</H2>
    <P>
      Every conference sells the same thing: connections. But attendees consistently rate
      networking as the most disappointing part of the experience. Despite billions spent on events
      every year, cold introductions still rely on luck.
    </P>

    <H3>2.1 Why event apps fail</H3>
    <P>
      Event software is great at selling tickets, printing badges, and sending surveys. But
      "networking apps" are usually just directories — lists of names and photos. A list only helps
      if you already know who you are looking for. It does nothing to help two strangers discover
      they need to meet.
    </P>
    <P><B>For attendees:</B></P>
    <UL>
      <li><B>Discovery only goes one way.</B> You cannot search for someone if you don't know they exist.</li>
      <li><B>No physical bridge.</B> Even if you spot an interesting profile, the app does not help you walk across the room and say hello.</li>
      <li><B>No feedback loop.</B> A handshake does not generate data. Organizers never learn who meets who, so the next event starts from scratch.</li>
      <li><B>Little exploitable data.</B> Connections made at events are hard to track and not data-friendly (e.g. business cards require manual scanning).</li>
    </UL>
    <P><B>For organizers:</B></P>
    <UL>
      <li><B>Little analytics.</B> Costly surveys are the only way to measure how people engaged — basic and slow.</li>
    </UL>

    <H3>2.2 The cost of doing nothing</H3>
    <P>
      For attendees, a bad event is wasted time and money. Leaving without a single good
      introduction means the event failed.
    </P>
    <P>
      For organizers, the cost is churn. If attendees don't get value, they don't buy tickets next
      year. Sponsors don't renew. When organizers can only measure success through vague
      satisfaction surveys, budgets get cut.
    </P>

    <H3>2.3 Who feels the pain</H3>
    <UL>
      <li>Professionals at conferences looking for a specific hire, investor, or client, but drowning in a crowd of 2,000 strangers.</li>
      <li>Founders at startup events where meeting the right person makes or breaks their year.</li>
      <li>First-timers who don't have an established clique and end up checking their phones in the corner.</li>
      <li>Organizers who have to justify rising ticket prices.</li>
    </UL>
    <P>
      Events exist because people want to meet. But the actual act of meeting is left entirely to
      chance. We built SENS because the introduction itself is the most valuable part of the event
      to own.
    </P>

    <H2 id="the-solution">3. The Solution</H2>
    <P>SENS is a live connection layer for events. It replaces luck with software.</P>

    <H3>3.1 The attendee experience</H3>
    <P>
      You get a link from the organizer or scan a QR code at the venue. SENS opens in your
      smartphone browser. You type your name, snap a photo or generate an AI avatar, and answer a
      few quick questions. Immediately, you see a live view of everyone else in the room, ranked by
      how well you match.
    </P>
    <P>
      Compatibility is calculated live. We blend personality frameworks (like MBTI or Saju) with
      your answers to custom event questions. We even use open-ended questions, AI embeddings, and
      semantic analysis to uncover deeper business goals.
    </P>
    <P>You can browse the room in four ways:</P>
    <UL>
      <li><B>Grid.</B> A simple list of photo cards sorted by match score.</li>
      <li><B>Radar.</B> A proximity map showing who is nearby.</li>
      <li><B>Relationship.</B> A live treemap visualising the social peer groups forming in the room — showing mutual connections and who to meet next.</li>
      <li><B>Ask SENS.</B> An AI concierge that gives you a ready-made icebreaker for any person in the room instantly.</li>
    </UL>
    <P>
      When you find someone you want to talk to, you walk up and verify the connection. It requires
      physical presence. You cannot just sit in your hotel room and spam requests. Every verified
      connection is saved, earns you points, and makes your recommendations smarter.
    </P>

    <H3>3.2 What the organizer sees</H3>
    <P>
      While attendees are connecting, organizers have a live view of everything through the SENS
      Admin Console.
    </P>
    <UL>
      <li><B>Live network dashboard.</B> Watch the connection graph form in real time — see the super-connectors pulling the room together, the clusters that are forming, and the wallflowers who haven't engaged yet and may need a nudge from the stage.</li>
      <li><B>Event builder.</B> Configure matching questions, verification mode, branding, and gamification rules before the event — no technical setup required.</li>
      <li><B>Gamification controls.</B> Set up networking quests, XP rewards, and challenges that require attendees to physically meet to score points — turning the room into a structured game without it feeling like one.</li>
      <li><B>Analytics & export.</B> After the event, download engagement metrics, connection CSVs, and NPS breakdowns within 72 hours. Give sponsors hard data on interaction volume instead of vague attendance numbers.</li>
    </UL>
    <P>
      For the first time, organizers can answer the question every event sponsor actually wants
      answered: <em>did the people in this room actually talk to each other?</em>
    </P>

    <H2 id="market">4. Market Analysis</H2>
    <P>
      The global events industry is massive, but the event tech segment is growing the fastest
      because organizers are desperate to prove their ROI. Millions of branded events happen every
      year. We are going after the professional conferences, summits, and offsites where networking
      is the primary product.
    </P>

    <H3>4.1 The alternatives</H3>
    <UL>
      <li><B>Attendee directories:</B> Glorified phone books.</li>
      <li><B>Matchmaking add-ons:</B> Forced, pre-scheduled 1-on-1 meetings that feel like job interviews.</li>
      <li><B>Consumer dating apps:</B> Creepy at a B2B event.</li>
      <li><B>Manual networking:</B> Nametags and forced icebreakers. Does not scale past 50 people.</li>
    </UL>
    <P>Nobody is solving real-time, in-room discovery.</P>

    <H3>4.2 Why now?</H3>
    <UL>
      <li><B>AI is cheap and fast.</B> Five years ago, live compatibility scoring for 2,000 people was too expensive. Now it is instant.</li>
      <li><B>Networking fatigue.</B> People are tired of digital connections. They want real, offline meetings — but they want the digital icebreaker first.</li>
    </UL>

    <H2 id="tech">5. Technical Specifications</H2>
    <H3>5.1 Proprietary AI Spatial Engine (Core R&D — TIPS Eligible)</H3>
    <P>
      This is the core intellectual property of the SENS platform. Rather than simply tracking
      physical location, our AI engine maps the psychology and behaviours of the crowd. By
      analysing the live graph of who connects with whom, it builds a deep, real-time understanding
      of human connection patterns.
    </P>
    <P>
      It is an "AI for understanding People" that identifies social dynamics, behavioural trends,
      and the underlying structure of peer groups as they form. This engine turns every verified
      interaction into exploitable insight — allowing organizers to understand the true behavioural
      flow of their event, not just who showed up.
    </P>

    <H3>5.2 Generative AI Layer</H3>
    <P>
      To power the platform's content and semantic matching, we run purpose-specific models
      alongside the spatial engine:
    </P>
    <UL>
      <li>Semantic embeddings for deep compatibility matching</li>
      <li>Avatar generation for attendees who skip photo upload</li>
      <li>Icebreaker and nickname generation for the Ask SENS concierge</li>
    </UL>
    <P>
      All generative AI is accessed through an OpenAI-compatible adapter layer, allowing the
      underlying models to be swapped as better options emerge — without touching the product
      layer.
    </P>

    <H2 id="roadmap">6. Roadmap, Financials, & The Ask</H2>
    <H3>6.1 The Ask</H3>
    <P>
      We are raising a <B>$250,000 Pre-Seed Round</B>. This funds our commercial launch and proves
      our $3,500 ACV model. Critically, this round is fully TIPS-Eligible for Korean matching
      grants.
    </P>
    <H3>6.2 Financial Forecast</H3>
    <UL>
      <li><B>Year 1:</B> $92K Revenue</li>
      <li><B>Year 2:</B> $638K Revenue</li>
      <li><B>Year 3:</B> $1.46M Revenue</li>
    </UL>
    <H3>6.3 Execution Roadmap</H3>
    <UL>
      <li><B>Phase 1 (Months 1–4):</B> Pilot validation at BEXCO and COEX. Dialling in the spatial engine.</li>
      <li><B>Phase 2 (Months 5–9):</B> Commercial Launch. Selling tiered SaaS licenses to 10–15 Korean conferences.</li>
      <li><B>Phase 3 (Months 10–14):</B> APAC Expansion. Scaling up in Tokyo, Singapore, and Hong Kong to trigger a Seed round.</li>
    </UL>

    <H2 id="conclusion">Conclusion & Next Steps</H2>
    <P>
      The only thing that matters at an event is who you meet. SENS replaces dead attendee
      directories with a live engine that helps people find the right contacts, break the ice, and
      walk away with connections worth keeping.
    </P>
    <P>
      To book a demo or talk about the Pre-Seed round, email us at{" "}
      <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">{EMAIL}</a>.
    </P>
  </>
);

const KrContent = () => (
  <>
    <H2 id="executive-summary">1. Executive Summary</H2>
    <P>
      행사는 우연한 만남을 팝니다. 하지만 실제로 그 약속을 지키는 경우는 드뭅니다. 200명 규모의
      컨퍼런스에서도 대부분의 참석자는 행사장에 들어올 때 알던 사람들과만 대화하다 돌아갑니다. 방
      안에는 분명 만나야 할 사람들이 있습니다. 문제는 서로가 서로를 모른다는 것, 그리고 행사가
      끝나기 전에 그 사람을 찾을 방법이 없다는 것입니다.
    </P>
    <P>
      SENS는 이 문제를 해결합니다. 행사장 전체를 하나의 네트워크로 만듭니다. SENS는 모바일 웹
      기반 플랫폼으로, 참석자들을 실시간으로 매칭하고 실제 대면 대화를 나눌 때마다 보상을
      제공합니다. 파일럿 운영 결과, 참석자 1인당 평균 <B>8건 이상의 실질적인 커넥션</B>이
      이루어졌으며(업계 평균의 3배), 만족도는 <B>10점 만점에 9.5점</B>, 재참석 의향은{" "}
      <B>100%</B>를 기록했습니다.
    </P>
    <P>별도의 앱 설치가 필요 없습니다. 링크 하나로 바로 시작합니다.</P>
    <P>이 백서는 SENS의 작동 방식, 타겟 시장, 그리고 비즈니스 모델을 설명합니다.</P>

    <H2 id="the-problem">2. 문제 정의</H2>
    <P>
      모든 컨퍼런스는 같은 것을 팝니다. 바로 인맥입니다. 그러나 참석자들이 행사에서 가장
      실망하는 부분도 항상 네트워킹입니다. 매년 수조 원이 행사에 쏟아붓는데도, 막상 첫 대화의
      문턱은 여전히 운에 맡겨져 있습니다.
    </P>

    <H3>2.1 기존 행사 앱이 실패하는 이유</H3>
    <P>
      행사 소프트웨어는 티켓 판매, 명찰 출력, 설문 수집에는 탁월합니다. 하지만 이른바 '네트워킹
      앱'이라고 불리는 것들은 대부분 명단에 불과합니다. 이름과 사진이 나열된 목록은, 이미 찾고
      있는 사람이 누구인지 알 때만 유용합니다. 서로의 존재조차 모르는 두 사람이 만나도록 돕는
      기능은 없습니다.
    </P>
    <P><B>참석자 입장에서 무너진 세 가지:</B></P>
    <UL>
      <li><B>일방향 탐색.</B> 존재 자체를 모르는 사람은 검색할 수 없습니다.</li>
      <li><B>물리적 연결의 부재.</B> 흥미로운 프로필을 발견해도, 앱은 그 사람에게 다가가도록 도와주지 않습니다.</li>
      <li><B>데이터 단절.</B> 악수는 데이터를 남기지 않습니다. 누가 누구를 만났는지 기록되지 않으니, 다음 행사도 처음부터 시작입니다.</li>
      <li><B>활용 불가능한 데이터.</B> 명함은 직접 스캔해야 하고, 행사장에서 맺은 인연은 대부분 흔적 없이 사라집니다.</li>
    </UL>
    <P><B>주최자 입장에서:</B></P>
    <UL>
      <li><B>분석 불가.</B> 참석자들이 얼마나 잘 어울렸는지 파악하려면 비용이 드는 설문에 의존할 수밖에 없습니다. 느리고 부정확합니다.</li>
    </UL>

    <H3>2.2 아무것도 하지 않았을 때의 비용</H3>
    <P>
      참석자에게 나쁜 행사는 시간과 돈의 낭비입니다. 제대로 된 만남 하나 없이 돌아가는 것, 그것이
      행사의 실패입니다.
    </P>
    <P>
      주최자에게는 이탈로 이어집니다. 참석자가 가치를 얻지 못하면 다음 해에 티켓을 사지 않습니다.
      스폰서도 떠납니다. 모호한 만족도 조사만으로 성과를 증명해야 한다면, 예산은 줄어들 수밖에
      없습니다.
    </P>

    <H3>2.3 누가 이 문제를 겪고 있나</H3>
    <UL>
      <li>2,000명의 군중 속에서 특정 채용 담당자, 투자자, 또는 고객을 찾아야 하는 업계 전문가</li>
      <li>한 번의 만남이 한 해를 바꿀 수 있는 스타트업 창업자</li>
      <li>아는 사람도 없고 어울릴 그룹도 없어 구석에서 스마트폰만 들여다보는 첫 참석자</li>
      <li>오르는 티켓 가격을 정당화해야 하는 행사 주최자</li>
    </UL>
    <P>
      사람들은 만나고 싶어서 행사에 옵니다. 하지만 실제 만남은 전적으로 운에 맡겨져 있습니다.
      우리가 SENS를 만든 이유는 바로 그 순간 — 소개가 이루어지는 그 순간 — 이 행사에서 가장
      가치 있는 지점이기 때문입니다.
    </P>

    <H2 id="the-solution">3. 솔루션</H2>
    <P>SENS는 이벤트를 위한 실시간 커넥션 레이어입니다. 운을 소프트웨어로 대체합니다.</P>

    <H3>3.1 참석자 경험</H3>
    <P>
      주최자로부터 링크를 받거나, 행사장 포스터의 QR 코드를 스캔합니다. SENS가 스마트폰
      브라우저에서 바로 열립니다. 이름을 입력하고, 사진을 찍거나 AI 아바타를 생성하고, 몇 가지
      질문에 답하면 끝입니다. 즉시 행사장 내 모든 참석자를 매칭 점수 순으로 확인할 수 있습니다.
    </P>
    <P>
      궁합 점수는 실시간으로 계산됩니다. MBTI나 사주 같은 성격 유형 프레임워크에 행사별 맞춤
      질문 답변을 결합합니다. 주관식 답변, AI 임베딩, 시맨틱 분석을 통해 더 깊은 비즈니스
      목표까지 파악합니다.
    </P>
    <P>행사장을 탐색하는 네 가지 방법:</P>
    <UL>
      <li><B>그리드:</B> 매칭 점수 순으로 정렬된 참석자 카드 목록</li>
      <li><B>레이더:</B> 주변에 있는 사람을 보여주는 근접 지도</li>
      <li><B>관계도:</B> 행사장 내에서 형성되고 있는 소셜 그룹을 시각화한 라이브 트리맵 — 상호 연결과 '다음에 만날 사람'을 한눈에 파악</li>
      <li><B>Ask SENS:</B> 원하는 참석자에게 바로 쓸 수 있는 아이스브레이커를 즉시 제공하는 AI 어시스턴트</li>
    </UL>
    <P>
      만나고 싶은 사람을 찾으면 직접 걸어가서 연결을 확인합니다. 반드시 물리적으로 함께 있어야
      합니다. 호텔방에 앉아서 요청을 남발할 수 없습니다. 확인된 모든 커넥션은 저장되고, 포인트가
      적립되며, 이후 추천이 더 정교해집니다.
    </P>

    <H3>3.2 주최자가 보는 것</H3>
    <P>
      참석자들이 연결되는 동안, 주최자는 SENS 어드민 콘솔을 통해 모든 것을 실시간으로
      파악합니다.
    </P>
    <UL>
      <li><B>라이브 네트워크 대시보드.</B> 커넥션 그래프가 형성되는 과정을 실시간으로 확인합니다. 행사장을 하나로 묶는 핵심 연결자, 형성 중인 그룹, 그리고 아직 아무도 만나지 못해 무대에서 직접 관심을 기울여야 할 참석자를 한눈에 파악할 수 있습니다.</li>
      <li><B>이벤트 빌더.</B> 매칭 질문, 연결 확인 방식, 브랜딩, 게이미피케이션 규칙을 행사 전에 설정합니다. 기술 지식이 없어도 됩니다.</li>
      <li><B>게이미피케이션 설정.</B> 직접 만나야만 점수를 얻을 수 있는 네트워킹 퀘스트, XP 보상, 미션을 구성합니다. 행사장 전체가 하나의 구조화된 게임이 되면서도, 참석자들은 그것을 게임이라고 느끼지 않습니다.</li>
      <li><B>분석 및 내보내기.</B> 행사 종료 후 72시간 이내에 참여도 지표, 커넥션 CSV, NPS 분석 결과를 다운로드할 수 있습니다. 스폰서에게 막연한 참석자 수 대신, 실제 상호작용 데이터를 제공합니다.</li>
    </UL>
    <P>
      모든 행사 스폰서가 진짜 알고 싶어 하는 질문에 이제 답할 수 있습니다.{" "}
      <em>이 방에 있는 사람들이 실제로 대화를 나눴는가?</em>
    </P>

    <H2 id="market">4. 시장 분석</H2>
    <P>
      글로벌 행사 산업은 거대하지만, 가장 빠르게 성장하는 것은 이벤트 테크 분야입니다. 주최자들이
      ROI를 증명해야 한다는 압박에 시달리고 있기 때문입니다. 매년 수백만 건의 기업 행사가
      열립니다. 우리의 타겟은 네트워킹 자체가 핵심 상품인 전문 컨퍼런스, 서밋, 기업 워크숍입니다.
    </P>

    <H3>4.1 기존 대안들</H3>
    <UL>
      <li><B>참석자 명단:</B> 정교한 전화번호부에 불과합니다.</li>
      <li><B>매칭 부가 기능:</B> 취업 면접처럼 느껴지는 강제 1:1 미팅.</li>
      <li><B>소비자용 데이팅 앱:</B> B2B 행사에서는 어색합니다.</li>
      <li><B>수동 네트워킹:</B> 명찰과 강제 아이스브레이커. 50명이 넘으면 통하지 않습니다.</li>
    </UL>
    <P>실시간 현장 탐색 문제를 해결하는 플레이어는 없습니다.</P>

    <H3>4.2 지금이어야 하는 이유</H3>
    <UL>
      <li><B>AI가 저렴하고 빠릅니다.</B> 5년 전만 해도 2,000명 규모의 실시간 궁합 분석은 비용이 너무 높았습니다. 지금은 즉각 처리됩니다.</li>
      <li><B>네트워킹 피로.</B> 사람들은 디지털 연결에 지쳐 있습니다. 오프라인 만남을 원하지만, 디지털 아이스브레이커가 먼저 필요합니다.</li>
    </UL>

    <H2 id="tech">5. 기술 사양</H2>
    <H3>5.1 독자적 AI 공간 엔진 (핵심 R&D — TIPS 지원 대상)</H3>
    <P>
      이것이 SENS 플랫폼의 핵심 지식재산입니다. 단순히 물리적 위치를 추적하는 것이 아니라,
      참석자 군중의 심리와 행동 패턴을 매핑합니다. 누가 누구와 연결되는지 라이브 그래프를
      분석해, 인간 커넥션 패턴에 대한 깊은 실시간 이해를 구축합니다.
    </P>
    <P>
      이것은 '사람을 위한 AI'입니다. 소셜 다이나믹스, 행동 트렌드, 그리고 피어 그룹이 형성되는
      과정의 구조를 식별합니다. 이 엔진은 모든 확인된 상호작용을 활용 가능한 인사이트로 전환해,
      주최자가 단순 출석 현황이 아닌 행사의 실제 행동 흐름을 파악할 수 있게 합니다.
    </P>

    <H3>5.2 생성형 AI 레이어</H3>
    <P>
      플랫폼의 콘텐츠와 시맨틱 매칭을 구동하기 위해, 공간 엔진과 함께 목적별 특화 모델을
      운영합니다:
    </P>
    <UL>
      <li>심층 궁합 분석을 위한 시맨틱 임베딩</li>
      <li>사진 업로드를 원하지 않는 참석자를 위한 아바타 생성</li>
      <li>Ask SENS 어시스턴트를 위한 아이스브레이커 및 닉네임 생성</li>
    </UL>
    <P>
      모든 생성형 AI는 OpenAI 호환 어댑터 레이어를 통해 연동되어, 더 나은 모델이 등장해도 제품
      레이어를 건드리지 않고 교체할 수 있습니다.
    </P>

    <H2 id="roadmap">6. 로드맵, 재무 계획 및 투자 유치</H2>
    <H3>6.1 투자 유치</H3>
    <P>
      <B>25만 달러 규모의 프리시드 라운드</B>를 진행 중입니다. 이 투자금은 상업적 런칭을 위한
      재원이며, 연간 계약 금액 3,500달러 모델의 유효성을 검증하는 데 사용됩니다. 이 라운드는
      한국 정부 매칭 펀드인 TIPS 지원 대상으로 확정되어 있습니다.
    </P>
    <H3>6.2 재무 전망</H3>
    <UL>
      <li><B>1년차:</B> 9만 2천 달러</li>
      <li><B>2년차:</B> 63만 8천 달러</li>
      <li><B>3년차:</B> 146만 달러</li>
    </UL>
    <H3>6.3 실행 로드맵</H3>
    <UL>
      <li><B>1단계 (1~4개월):</B> BEXCO, COEX 파일럿 검증. 공간 엔진 정교화.</li>
      <li><B>2단계 (5~9개월):</B> 상업적 런칭. 국내 컨퍼런스 10~15곳에 SaaS 라이선스 판매.</li>
      <li><B>3단계 (10~14개월):</B> APAC 확장. 도쿄, 싱가포르, 홍콩 진출로 시드 라운드 트리거.</li>
    </UL>

    <H2 id="conclusion">결론 및 다음 단계</H2>
    <P>
      행사에서 중요한 것은 단 하나입니다. 누구를 만났는가. SENS는 죽어있는 참석자 명단을
      살아있는 엔진으로 대체합니다. 올바른 사람을 찾고, 대화의 물꼬를 트고, 오래 지속될 인연을
      맺고 돌아갈 수 있도록.
    </P>
    <P>
      데모 신청 또는 프리시드 투자 문의:{" "}
      <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">{EMAIL}</a>
    </P>
  </>
);

const Whitepaper = () => {
  const [lang, setLang] = useState<Lang>("en");
  const sections = sectionsByLang[lang];
  const t = lang === "en" ? en : kr;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{lang === "en" ? "SENS Whitepaper — The Connection Layer for In-Person Events" : "SENS 백서 — 오프라인 이벤트를 위한 커넥션 레이어"}</title>
        <meta
          name="description"
          content={lang === "en"
            ? "SENS whitepaper v1.0: the live connection layer for in-person events — real-time matching, gamified verified introductions, organiser-owned data."
            : "SENS 백서 v1.0: 오프라인 이벤트를 위한 실시간 커넥션 레이어 — 실시간 매칭, 확인된 만남에 보상, 주최자가 소유하는 데이터."}
        />
        <link rel="canonical" href="https://www.sensai.cc/whitepaper" />
        <meta property="og:url" content="https://www.sensai.cc/whitepaper" />
        <meta property="og:type" content="article" />
        <html lang={lang === "en" ? "en" : "ko"} />
      </Helmet>

      <Link
        to="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-all text-[11px] font-medium tracking-wide"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{lang === "en" ? "Back" : "뒤로"}</span>
      </Link>

      <div className="fixed top-4 right-4 z-50 flex items-center rounded-full bg-card/80 backdrop-blur-sm border border-border overflow-hidden text-[11px] font-semibold tracking-wide">
        {(["en", "kr"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1.5 transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <article className="container max-w-3xl py-24 md:py-32">
        <header className="mb-16 pb-10 border-b border-border">
          <span className="font-logo text-sm font-extrabold tracking-[0.2em] uppercase text-gradient-primary">
            SENS
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-6 mb-4">
            {t.title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-4">
            {t.subtitle}
          </p>
          <p className="text-sm text-muted-foreground tracking-wide uppercase">
            {lang === "en" ? "Whitepaper · v1.0 · Published by SENS" : "백서 · v1.0 · SENS 발행"}
          </p>
        </header>

        <nav className="mb-16 rounded-2xl border border-border bg-card/40 p-6 md:p-8">
          <h2 className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
            {lang === "en" ? "Table of Contents" : "목차"}
          </h2>
          <ol className="space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-foreground/80 hover:text-primary transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {lang === "en" ? <EnContent /> : <KrContent />}

        <footer className="mt-24 pt-8 border-t border-border text-xs text-muted-foreground/70 text-center">
          © SENS · {lang === "en" ? "Whitepaper v1.0" : "백서 v1.0"}
        </footer>
      </article>
    </div>
  );
};

export default Whitepaper;