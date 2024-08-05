export default function AboutMe() {
  const Person = {
    PersonalData: {
      name: `Mário Victor Quarta Afonso`,
      age: "",
    },

    WorkExperience: {},

    Educations: {},
    Goals: {},
  };

  const formula = new Date();
  const age = formula.getFullYear() - 1997;

  console.log(formula.getUTCFullYear().toString);

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="container">
        <div className="flex flex-col gap-6 px-4 py-10 md:gap-8 lg:flex-row">
          <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center">
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                {Person.PersonalData.name}
              </h1>
              <h2 className="text-sm font-normal tracking-[0.5rem] leading-loose @[480px]:text-base @[480px]:font-normal @[480px]:leading-loose">
                SOFTWARE ENGNEER
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-[3]">
          <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
            Work Experience
          </h1>
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl blur-cover cv-body-element p-4">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">
                    CENTRO INTEGRADO DE SEGURANÇA PÚBLICA{" "}
                  </p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    <b></b>, 2021—2023 I help bring
                    to life the creative strategy, concepting, and design work
                    for a range of regional, national, and global clients.
                    Responsibilities include providing direction and feedback to
                    creative team members, helping develop creative strategy for
                    projects, and working with internal stakeholders to develop
                    creative briefs for our team. I am also heavily involved in
                    pitching and selling ideas to clients and various
                    stakeholders.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">
                    CLARK CREATIVE
                  </p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    Art Director & Design Team Lead, 2018—2021 In tandem with
                    the agency’s CEO, I oversaw and ensured the quality of
                    nearly all creative work that included print, packaging,
                    website design, and social media, to accomplish the business
                    goals of our various clients. The team was small and relied
                    on freelancers, whom I was tasked with briefing into ongoing
                    and new projects.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">BALDWIN</p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    Senior Art Director, 2017—2018 I developed creative work and
                    campaigns for Krispy Kreme, Bridgestone, Long John Silvers,
                    Cree Lighting, and a handful of smaller brands and internal
                    projects. Responsibilities included creative strategy
                    development, art and design direction, and mentoring
                    younger, less experienced designers in the agency.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">POSSIBLE</p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    Art Director & Senior Designer, 2014—2016 I brought ideas to
                    life for AT&T, Microsoft Edge, Coca-Cola, Microsoft Office,
                    and the Susan G. Komen Foundation. I played a key role in
                    developing a national campaign for AT&T’s #ItCanWait
                    division, and also helped to build, lead, and mentor
                    reactive social media teams for Microsoft Office and
                    Coca-Cola’s reactive social team that was built for the 2016
                    Olympics.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">
                    JULEP BEAUTY
                  </p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    Senior Designer, 2014 I had a chance to work on projects
                    that ranged from concepting full social & email campaigns
                    about nail polish to art directing photo shoots to creating
                    makeup tutorials for their website. My responsibilities
                    included collaborating with team members to develop campaign
                    ideas, presenting work and communicating with internal
                    stakeholders, and addressing and implementing stakeholder
                    feedback.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">PUBLICIS</p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    Art Director & Designer, 2013—2014 I primarily created work
                    for T-Mobile, including involvement in developing their
                    global rebranding and look & feel that was unveiled in 2013
                    during their meteoric rise as a company. Responsibilities
                    included collaborating with creative team mates, design
                    production, building development departments, putting
                    together storyboards for TV media, participating in
                    production companies and animators — all in the service of
                    helping T-Mobile grow from the 4th largest national carrier
                    in 2013 to the 2nd largest carrier now in 2023.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">
                    FREELANCE CREATIVE
                  </p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    2007—Present I’ve always taken on freelance work, even on
                    top of my day job at various agencies and clients. When
                    asked what I can say, I like making things! I have a laptop,
                    passport, and will go anywhere the work is cool.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1.5]">
          <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
            Educação
          </h1>
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl blur-cover cv-body-element p-4">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">
                    ISTITUTO SUPERIOR KALANDULA DE ANGOLA
                  </p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    Engenharia Informática
                    <br />
                    2016—2021
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">
                    COLÉGIO MUNDO NOVO
                    <br></br>(ALDA LARA){" "}
                  </p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    Médio Técnico de Informática
                    <br />
                    2013—2015
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
            Awards
          </h1>
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl blur-cover cv-body-element p-4">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">Awards</p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    Yes. But they are in a box somewhere in my attic, because
                    you’re only as good as your last project.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
            Find Me Online
          </h1>
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl blur-cover cv-body-element p-4">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">
                    <a href="">Instagram</a> | <a href="">Facebook</a> |{" "}
                    <a href="">LinkedIn</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
