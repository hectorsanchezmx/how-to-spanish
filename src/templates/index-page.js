import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import axios from 'axios'
import instagram from '../img/social/instagram.png'
import youtube from '../img/social/youtube.png'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  heroLink,
  heroImage,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => {

  const [followers, setFollowers] = useState(0)

  useEffect(()=>{
    const getFollowers = async () => {
      const res = await axios.get('https://www.instagram.com/howtospanish/?__a=1')
      const followers = res.data.graphql.user.edge_followed_by.count
      setFollowers(followers)
    }
    getFollowers()
  }, [followers])

  return (
  <div>
    <Link className="btn hero" to={heroLink}>
      <div
        className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url(${
            !!heroImage.childImageSharp ? heroImage.childImageSharp.fluid.src : heroImage
          })`,
          backgroundPosition: `top left`,
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '150px',
            lineHeight: '1',
            justifyContent: 'space-around',
            alignItems: 'left',
            flexDirection: 'column',
          }}
        >
          {/* <h1
            className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
            style={{
              boxShadow:
                'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
              backgroundColor: 'rgb(255, 68, 0)',
              color: 'white',
              lineHeight: '1',
              padding: '0.25em',
            }}
          >
            {title}
          </h1>
          <h3
            className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
            style={{
              boxShadow:
                'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
              backgroundColor: 'rgb(255, 68, 0)',
              color: 'white',
              lineHeight: '1',
              padding: '0.25em',
            }}
          >
            {subheading}
          </h3> */}
        </div>
      </div>
    </Link>
    <section className="section section--gradient">
      <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="conten content-subscribe">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  {/* <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div> */}
                </div>
                <div className="social-section">
                  <div>
                    <img src={instagram} alt="instagram" style={{width: '100px'}} />
                    <p className="follower-count">{followers.toString().slice(0, 2)}K</p>
                    <p>followers</p>
                  </div>
                  <div>
                    <img src={youtube} alt="youtube" style={{width: '100px', margin: '1em'}} />
                    <p className="follower-count">{followers.toString().slice(0, 2)}K</p>
                    <p>followers</p>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="column is-12">
                  {/* <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3> */}
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  </div>
)}

IndexPageTemplate.propTypes = {
  heroLink: PropTypes.string,
  heroImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        heroLink={frontmatter.heroLink}
        heroImage={frontmatter.heroImage}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        heroLink
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
