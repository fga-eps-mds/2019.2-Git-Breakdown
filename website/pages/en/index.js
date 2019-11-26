/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/logo_fundo_br.png`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href="https://github.com/fga-eps-mds/2019.2-Git-Breakdown">GitHub</Button>
            <Button href="/docs/backlog">Documentação</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
              'To make your landing page more attractive, use illustrations! Check out ' +
              '[**unDraw**](https://undraw.co/) which provides you with customizable illustrations which are free to use. ' +
              'The illustrations you see on this page are from unDraw.',
            image: `${baseUrl}img/tela_usuario.png`,
            imageAlign: 'left',
            title: 'Wonderful SVG Illustrations',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="light">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/metricas_usuario.png`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              'Each new Docusaurus project has **randomly-generated** theme colors.',
            image: `${baseUrl}img/tela_geral.png`,
            imageAlign: 'right',
            title: 'Randomly Generated Theme Colors',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'This is the content of my feature',
            image: `${baseUrl}img/undraw_react.svg`,
            imageAlign: 'top',
            title: 'Feature One',
          },
          {
            content: 'The content of my second feature',
            image: `${baseUrl}img/undraw_operating_system.svg`,
            imageAlign: 'top',
            title: 'Feature Two',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Gestores</h2>
          <div className="row">
          <div className="column">
            <div className="img-style" style={{width: "200px"}}>
              <div className="hovereffect">
                <img className="img-responsive" src="https://i.ibb.co/Jnqb1pT/diego.jpg" alt=""></img>
                <div className="overlay">
                    <h2>Diego Resende</h2>
                    <p>
                        Product Owner
                    </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="img-style" style={{width: "200px"}}>
              <div className="hovereffect">
                <img className="img-responsive" src="https://i.ibb.co/ByN5vTP/mateus.jpg" alt=""></img>
                <div className="overlay">
                    <h2>Matheus Oliveira</h2>
                    <p>
                        DevOps
                    </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="img-style" style={{width: "200px"}}>
              <div className="hovereffect">
                <img className="img-responsive" src="https://i.ibb.co/K72N65T/lucas-2.jpg" alt=""></img>
                <div className="overlay">
                    <h2>Lucas Midlhey</h2>
                    <p>
                        Scrum Master
                    </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      );
    };

    const Showcase2 = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Desenvolvedores</h2>
          <div className="row">
          <div className="column">
            <div className="img-style" style={{width: "200px"}}>
              <div className="hovereffect">
                <img className="img-responsive" src="https://i.ibb.co/HzSBJVB/daia.jpg" alt=""></img>
                <div className="overlay">
                    <h2>Pedro Daia</h2>
                    <p>
                        Desenvolvedor
                    </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="img-style" style={{width: "200px"}}>
              <div className="hovereffect">
                <img className="img-responsive" src="https://i.ibb.co/Jy7jtNw/victor-2.jpg" alt=""></img>
                <div className="overlay">
                    <h2>Victor Antunes</h2>
                    <p>
                        Desenvolvedor
                    </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="img-style" style={{width: "200px"}}>
              <div className="hovereffect">
                <img className="img-responsive" src="https://i.ibb.co/fdnHY0b/paulo-3.jpg" alt=""></img>
                <div className="overlay">
                    <h2>Paulo Gontijo</h2>
                    <p>
                        Desenvolvedor
                    </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="img-style" style={{width: "200px"}}>
              <div className="hovereffect">
                <img className="img-responsive" src="https://i.ibb.co/Xyknk4b/pedro-3.jpg" alt=""></img>
                <div className="overlay">
                    <h2>Pedro Daniel</h2>
                    <p>
                        Desenvolvedor
                    </p>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="img-style" style={{width: "200px"}}>
              <div className="hovereffect">
                <img className="img-responsive" src="https://i.ibb.co/9hDDzg5/joao.jpg" alt=""></img>
                <div className="overlay">
                    <h2>João Victor</h2>
                    <p>
                        Desenvolvedor
                    </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <LearnHow />
          <TryOut />
          <Description />
          <Showcase />
          <Showcase2 />
        </div>
      </div>
    );
  }
}

module.exports = Index;
