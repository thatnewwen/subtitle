import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import { Layout, Listing, Wrapper, Title } from "../components";
import website from "../../config/website";
import Logo from "../images/SUBTITLE.png";
import Within from "../images/within.png";
import Lost from "../images/lost.png";

const Hero = styled.header`
  background-color: ${(props) => props.theme.colors.baseOrange};
  flex-direction: column;
  display: flex;
    align-items: flex-start;
    justify-content: space-between;
  flex: 1;

  .topSection{
    color:${(props) => props.theme.colors.mainOrange};
    font-size: 0.7rem;
    padding: 2rem;

    @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 1.5rem;
    padding-bottom: 0
  }
  }

  .groupLogo{
    width: 75px;
    height: 75px;
    object-fit: contain;
    margin-right: 0px;
  }

  .divider{
    color:${(props) => props.theme.colors.mainOrange};
    margin: 15px;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
  main {
    background-color: ${(props) => props.theme.colors.baseOrange};
    flex: 2;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    height: auto;
    
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    
  }
`;

const HeroInner = styled(Wrapper)`
  padding: 2rem;
  h1 {
    margin-bottom: 2rem;
  }
  img{
    width: 150px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`;

const HeroText = styled.div`
  font-size: 0.7rem;
  line-height: 1.4;
  margin: 1rem 0;
  margin-bottom: 0;
  color: ${(props) => props.theme.colors.mainOrange};
  p {
    margin-bottom: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 1.4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 1.25rem;
  }
`;

const Social = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  li {
    display: inline;
    &:not([data-name="social-entry-0"]) {
      margin-left: 2.5rem;
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        margin-left: 1.75rem;
      }
    }
    a {
      font-style: normal;
      color: ${(props) => props.theme.colors.greyDark};
      font-size: 1.333rem;
      font-weight: 600;
      &:hover,
      &:focus {
        color: ${(props) => props.theme.colors.primary};
        text-decoration: none;
      }
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        font-size: 1.2rem;
      }
    }
  }
`;

const ProjectListing = styled.ul`
  list-style-type: none;
  margin-left: 0;
  margin-top: 4rem;
  li {
    margin-bottom: 1.45rem;
    a {
      font-size: 2.369rem;
      font-style: normal;
      color: ${(props) => props.theme.colors.black};
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        font-size: 1.777rem;
      }
    }
  }
`;

const IndexWrapper = styled.main`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 2rem;
  overflow: scroll;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin: inherit;
    padding: 0 1.5rem;
  }
`;


class Index extends Component {
  render() {
    const {
      data: { homepage, social, posts, projects },
    } = this.props;
    return (
      <Layout>
        <HomeContainer>
          <Hero>
            <p className="topSection">moving pictures + people from asia</p>
            <HeroInner>
              <img src={Logo} alt="subtitle logo" />
              <HeroText
                dangerouslySetInnerHTML={{ __html: homepage.data.content.html }}
              />
              <img src={Lost} className="groupLogo" alt="subtitle logo" /> 
              <span className="divider"></span>
              <img src={Within} className="groupLogo" alt="subtitle logo" />
              {/* <Social>
                {social.nodes.map((s, index) => (
                  <li
                    data-name={`social-entry-${index}`}
                    key={s.primary.label.text}
                  >
                    <a href={s.primary.link.url}>{s.primary.label.text}</a>
                  </li>
                ))}
              </Social> */}
            </HeroInner>
          </Hero>
          <IndexWrapper
            id={website.skipNavId}
            className="index-wrapper"
            style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
          >
            <Listing posts={posts.nodes} />
            {/* <Title style={{ marginTop: "8rem" }}>Recent projects</Title>
            <ProjectListing>
              {projects.nodes.map((project) => (
                <li key={project.primary.label.text}>
                  <a href={project.primary.link.url}>
                    {project.primary.label.text}
                  </a>
                </li>
              ))}
            </ProjectListing> */}
          </IndexWrapper>
        </HomeContainer>
      </Layout>
    );
  }
}

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.shape({
      data: PropTypes.shape({
        title: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }),
        content: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }),
      }),
    }),
    social: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    projects: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
    social: allPrismicHeroLinksBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
    posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
      nodes {
        uid
        data {
          title {
            text
          }
          subtitle {
            text
          }
          description
          featured_image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          date(formatString: "MM.DD.YYYY")
          categories {
            category {
              document {
                data {
                  name
                }
              }
            }
          }
          writer {
            document {
              data {
                name
              }
            }
          }
        }
      }
    }
    projects: allPrismicProjectsBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
  }
`;
