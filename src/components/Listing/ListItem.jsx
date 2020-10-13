import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import Categories from "./Categories";
import Img from "gatsby-image";
import Static from "../../images/static2.gif";


const Item = styled.li`
  margin-bottom: 4.45rem;
  font-size: 14px;
  color: #ff4647;

  .authorSection {
    margin-bottom: 15px;
    font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    font-style: italic;
  }

  .featuredImageContainer{
    position: relative;

    .gatsby-image-wrapper{
      max-height: 370px;
    }
  }

  .orangeMask{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .static{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.1;
  }
`;

const Headline = styled.p`
  margin-top: 5px;
  margin-bottom: 0;
  font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  color: ${(props) => props.theme.colors.mainOrange};
  a {
    color: ${(props) => props.theme.colors.mainOrange};
    font-style: normal;
    font-weight: normal;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  display: block;
  text-transform: uppercase;
  font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  color: ${(props) => props.theme.colors.mainOrange};
  font-style: normal;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 1rem;
  }
  .subtitle{
    color: ${(props) => props.theme.colors.lightOrange};
    font-weight: 600;
  }
`;

export default class ListItem extends Component {
  render() {
    const { node, categories, writer } = this.props;

    return (
      <Item>
        <div className="featuredImageContainer">
          <div className="orangeMask"></div>
          <img src={Static} alt="static" className="static" />
          <Img fluid={node.data.featured_image.localFile.childImageSharp.fluid} />
        </div>
        <Headline>
          {node.data.date} —{" "}
          {categories && <Categories categories={categories} />}
        </Headline>
        <StyledLink to={node.uid}>{node.data.title.text} <span className="subtitle">{node.data.subtitle.text}</span></StyledLink>
        <p className="authorSection">By {writer}</p>
        {node.data.description}
      </Item>
    );
  }
}

ListItem.propTypes = {
  node: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  writer: PropTypes.node
};
