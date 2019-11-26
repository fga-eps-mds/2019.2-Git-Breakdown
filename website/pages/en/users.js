/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;

class Users extends React.Component {
  render() {
    const {config: siteConfig} = this.props;
    if ((siteConfig.users || []).length === 0) {
      return null;
    }

    const editUrl = `${siteConfig.repoUrl}/edit/master/website/siteConfig.js`;
    const showcase = siteConfig.users.map(user => (
      <a href={user.infoLink} key={user.infoLink}>
        <img src={user.image} alt={user.caption} title={user.caption} />
      </a>
    ));

    return (
      <div className="mainContainer" style={{background: "#DCDCDC"}}>
        <div className="tittleTeam">
            <p>Conheça nossa equipe</p>
        </div>
        <Container padding={['bottom', 'top']}>
        <div className="row">
          <div className="column">
            <div className="img-style" style={{width: "200px"}}>
              <div className="hovereffect">
                <img className="img-responsive" src="https://i.ibb.co/9hDDzg5/joao.jpg" alt=""></img>
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
                <img className="img-responsive" src="https://i.ibb.co/9hDDzg5/joao.jpg" alt=""></img>
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
                <img className="img-responsive" src="https://i.ibb.co/9hDDzg5/joao.jpg" alt=""></img>
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
                <img className="img-responsive" src="https://i.ibb.co/9hDDzg5/joao.jpg" alt=""></img>
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
                <img className="img-responsive" src="https://i.ibb.co/9hDDzg5/joao.jpg" alt=""></img>
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
                <img className="img-responsive" src="https://i.ibb.co/9hDDzg5/joao.jpg" alt=""></img>
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
                <img className="img-responsive" src="https://i.ibb.co/9hDDzg5/joao.jpg" alt=""></img>
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
                <img className="img-responsive" src="https://i.ibb.co/9hDDzg5/joao.jpg" alt=""></img>
                <div className="overlay">
                    <h2>Diego Resende</h2>
                    <p>
                        Product Owner
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Container>
      </div>
    );
  }
}

module.exports = Users;


