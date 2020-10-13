import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ListItem from './ListItem'

const List = styled.ul`
  list-style-type: none;
  margin-left: 0;
  padding: 0 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 0px;
  }
`

export default class Listing extends Component {
  render() {
    const { posts } = this.props
    return (
      <List>
        {posts.map((post) => {
          let categories = false
          let writer = false
          if (post.data.categories[0].category) {
            categories = post.data.categories.map((c) => c.category.document[0].data.name)
          }
          if (post.data.writer) {
            writer = post.data.writer.document[0].data.name;
          }
          return <ListItem key={post.uid} node={post} categories={categories} writer={writer} />
        })}
      </List>
    )
  }
}

Listing.propTypes = {
  posts: PropTypes.array.isRequired,
}
