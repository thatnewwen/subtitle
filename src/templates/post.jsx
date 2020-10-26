import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import {
  Layout,
  Listing,
  Wrapper,
  SliceZone,
  Title,
  SEO,
  Header,
} from "../components";
import Categories from "../components/Listing/Categories";
import website from "../../config/website";
import Img from "gatsby-image";
import Static from "../images/static2.gif";

const Hero = styled.header`
  padding-bottom: 4rem;
  background-color: ${(props) => props.theme.colors.baseOrange};

  .static{
    position: absolute;
    width: 100%;
    height: 80vh;
    z-index: 1;
    opacity: 0.1;
  }

  .topImage{
    height: 80vh;
  }

  p {
    font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  color: ${(props) => props.theme.colors.mainOrange};
  margin: auto;
  margin-top: 10px;
  margin-bottom: 0;
  }

  .creditsContainer{
  max-width: 1000px;
  padding-left: 2rem;
  margin: auto;

  p {
    display: inline-block;
    margin-right: 30px;
  }
  }

  label{
    text-transform: uppercase;
    font-weight:bold;
    margin-bottom: 0;
    font-size: 0.7rem;
  }

  h1{
    padding-left: 2rem;
    font-size: 3.2rem;
  display: block;
  max-width: 1000px;
  margin: auto;
  text-transform: uppercase;
  font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  color: ${(props) => props.theme.colors.mainOrange};
  }

  h2{
    padding-left: 2rem;
    font-size: 2.2rem;
  display: block;
  max-width: 1000px;
  margin: auto;
  text-transform: uppercase;
  font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  color: ${(props) => props.theme.colors.lightOrange};
  }
`;

const Headline = styled.p`
padding-left: 2rem;
  max-width: 1000px;
  font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  color: ${(props) => props.theme.colors.grey};
  font-size: 1rem;
  a {
    font-style: normal;
    font-weight: normal;
  }
`;

const PostWrapper = Wrapper.withComponent("main");

const Post = ({ data: { prismicPost, posts }, location }) => {
  const { data } = prismicPost;
  let categories = false;
  if (data.categories[0].category) {
    categories = data.categories.map((c) => c.category.document[0].data.name);
  }
  return (
    <Layout customSEO>
      <SEO
        title={`${data.title.text} | ${website.titleAlt}`}
        pathname={location.pathname}
        desc={data.description}
        node={prismicPost}
        article
        banner={data.featured_image.localFile.childImageSharp.fluid.src}
      />
      <Hero>
      <img src={Static} alt="static" className="static" />

          <Img className="topImage" fluid={data.featured_image.localFile.childImageSharp.fluid} />
          <Header />
          <Headline>
            {data.date} — {categories && <Categories categories={categories} />}
          </Headline>
          <h1>{data.title.text}</h1>
          <h2>{data.subtitle.text}</h2>
          <div class="creditsContainer">
            <p><label>Writer</label><br></br>{data.writer.document[0].data.name}</p>
            {data.editor && <p><label>Editor</label><br></br>{data.editor.document[0].data.name}</p>}
          </div>
      </Hero>
      <PostWrapper id={website.skipNavId}>
        <SliceZone allSlices={data.body} />
        {/* <Title style={{ marginTop: "4rem" }}>Recent posts</Title>
        <Listing posts={posts.nodes} /> */}
      </PostWrapper>
    </Layout>
  );
};

export default Post;

Post.propTypes = {
  data: PropTypes.shape({
    prismicPost: PropTypes.object.isRequired,
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

// The typenames come from the slice names
// If this doesn't work for you query for __typename in body {} and GraphiQL will show them to you

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      uid
      first_publication_date
      last_publication_date
      data {
        title {
          text
        }
        subtitle {
          text
        }
        featured_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        description
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
        editor {
          document {
            data {
              name
            }
          }
        }
        body {
          ... on PrismicPostBodyText {
            slice_type
            id
            primary {
              text {
                html
              }
            }
          }
          # ... on PrismicPostBodyCodeBlock {
          #   slice_type
          #   id
          #   primary {
          #     code_block {
          #       html
          #     }
          #   }
          # }
          # ... on PrismicPostBodyQuote {
          #   slice_type
          #   id
          #   primary {
          #     quote {
          #       html
          #       text
          #     }
          #   }
          # }
          # ... on PrismicPostBodyImage {
          #   slice_type
          #   id
          #   primary {
          #     image {
          #       localFile {
          #         childImageSharp {
          #           fluid(maxWidth: 1200, quality: 90) {
          #             ...GatsbyImageSharpFluid_withWebp
          #           }
          #         }
          #       }
          #     }
          #   }
          # }
        }
      }
    }
    posts: allPrismicPost(
      limit: 2
      sort: { fields: [data___date], order: DESC }
      filter: { uid: { ne: $uid } }
    ) {
      nodes {
        uid
        data {
          title {
            text
          }
          featured_image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                  src
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
        }
      }
    }
  }
`;
