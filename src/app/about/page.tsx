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
                COMPUTER ENGNEER
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
                    AJUDANTE DE COZINHA{" "}
                  </p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    <b>2024</b>, Atualmente trabalho na restauração por tempo
                    completo e nos tempos livres tenho focado no melhoramento
                    dos meu projetos particulares (documentação, otimização de
                    imagens, etc... ).
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">
                    FREE LANCER - SUPORTE TÉCNICO
                  </p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    <b>2023 - 2024</b>, Colaborei com técnicos da wondercom, sem
                    contrato, prestamos suporte técnico aos clientes da
                    vodafone, desde a conﬁguração e instalação de equipamentos
                    de rede, tv e voz, identiﬁcação e resolução de problemas em
                    instalações de ﬁbra, relação com os clientes por meio de uma
                    plataforma de ticket.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">
                    CENTRO INTEGRADO DE SEGURANÇA PÚBLICA{" "}
                  </p>
                  <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                    <b>2021 - 2023</b>, Realizei tarefas manutenção preventiva e
                    preditiva de equipamentos informáticos a nível de
                    departamentos, desenvolvi um software escrito em C# e Java
                    para emissão de passes (que nesse momento deve estar num HD
                    em algures distante), ajudei no suporte aplicacional de
                    softwares dos sistemas Linux (CentOs) e Windows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1.5]">
          <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
            Education
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
                    Licenciado Em Engenharia Informática
                    <br />
                    2016 — 2021
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
                    Técnico Médio de Informática
                    <br />
                    2013 — 2015
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
            Goals
          </h1>
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl blur-cover cv-body-element p-4">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div
                  className="flex flex-col gap-1"
                  style={{ lineHeight: 1.5 }}
                >
                  <p className="text-base font-bold leading-tight">Goals</p>
                  <p className="cv-element m-3 text-sm font-normal leading-loose">
                    <ul className="list-disc">
                      <li className="line-through">Obter a licenciatura </li>
                      <li className="line-through">
                        Primeiro emprego na área de tecnologias{" "}
                      </li>
                      <li className="line-through">Aprender um novo idioma</li>
                      <li className="">Primeiro emprego como programador</li>
                      <li className="">
                        Especialização em engenharia de software
                      </li>
                    </ul>
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
                    <a href="https://dev.to/mario2211debug">Dev.to</a> |{" "}
                    <a href="https://github.com/Mario2211-debug">Github</a> |{" "}
                    <a href="https://linkedin.com/in/mario-afonso-018107141">
                      LinkedIn
                    </a>
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
