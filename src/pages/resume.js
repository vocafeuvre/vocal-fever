import React from "react"
import { graphql } from "gatsby"
import Image from 'gatsby-image'
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import Helmet from "react-helmet"

export const pageQuery = graphql`
    query {
        resumePic: file(absolutePath: { regex: "/profile.jpg/" }) {
            childImageSharp {
                fixed(width: 150, height: 150) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        allResumeJson {
            edges {
                node {
                    name
                    jobTitle
                    description
                    personalInfo {
                        label
                        value
                        link
                    }
                    skills {
                        skill
                        rating
                    }
                    hobbies {
                        hobby
                        description
                    }
                    workExperience {
                        period
                        company
                        roles
                        description
                    }
                    education {
                        period
                        school
                        degree
                        description
                    }
                    goals
                }
            }
        }
    }
`

export default props => {
  const { data } = props
  const devResume = data.allResumeJson.edges[0].node
  const resumePic = data.resumePic.childImageSharp.fixed

  return (
    <>
      <Helmet
        link={[
          {
            rel: "stylesheet",
            href:
              "https://fonts.googleapis.com/css?family=Lato|Open+Sans:400,600",
          },
        ]}
        meta={[
          {
            name: "viewport",
            content: "width=device-width, shrink-to-fit=no, initial-scale=1",
          },
        ]}
      />
      <Page>
        <Content>
          <Striker>
            <Portrait>
              <Image
                fixed={resumePic}
                alt={"Profile Pic"}
                css={css`
                    margin-bottom: 10px;
                `}
              />
              <Title>{devResume.name}</Title>
              <Subtitle>{devResume.jobTitle}</Subtitle>
            </Portrait>
            <StrikerSection>
              <StrikerHeader>My Info</StrikerHeader>
              {devResume.personalInfo !== undefined ? (
                devResume.personalInfo.map((value, index) => {
                  return (
                    <StrikerItem key={index}>
                      <StrikerItemLabel>{value.label}</StrikerItemLabel>
                      <StrikerItemContent>
                        {value.link ? (
                          <AnchorLink href={value.link}>{value.value}</AnchorLink>
                        ) : (
                          value.value
                        )}
                      </StrikerItemContent>
                    </StrikerItem>
                  )
                })
              ) : (
                <StrikerItem>
                  <StrikerItemLabel>No personal info</StrikerItemLabel>
                </StrikerItem>
              )}
            </StrikerSection>
            <StrikerSection>
              <StrikerHeader>Skills</StrikerHeader>
              {devResume.skills !== undefined ? (
                devResume.skills.map((value, index) => {
                  return (
                    <StrikerItem
                      css={css`
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      `}
                      key={index}
                    >
                      <StrikerItemLabel>{value.skill}</StrikerItemLabel>
                      <StrikerItemContent>{value.rating}</StrikerItemContent>
                    </StrikerItem>
                  )
                })
              ) : (
                <StrikerItem>
                  <StrikerItemLabel>No skills</StrikerItemLabel>
                </StrikerItem>
              )}
            </StrikerSection>
            <StrikerSection>
              <StrikerHeader>Hobbies</StrikerHeader>
              {devResume.hobbies !== undefined ? (
                devResume.hobbies.map((value, index) => {
                  return (
                    <StrikerItem key={index}>
                      <StrikerItemLabel>{value.hobby}</StrikerItemLabel>
                      <StrikerItemContent>{value.description}</StrikerItemContent>
                    </StrikerItem>
                  )
                })
              ) : (
                <StrikerItem>
                  <StrikerItemLabel>No hobbies</StrikerItemLabel>
                </StrikerItem>
              )}
            </StrikerSection>
          </Striker>
          <DetailSection>
            <Detail>
              <DetailHeader>About Me</DetailHeader>
              <DetailContent>{devResume.description}</DetailContent>
            </Detail>
            <Detail>
              <DetailHeader>Work Experience</DetailHeader>
              {devResume.workExperience
                ? devResume.workExperience.map((value, index) => {
                    return (
                    <TimelineItem key={index}>
                        <TimelinePeriod>{value.period}</TimelinePeriod>
                        <TimelineBody>
                            <TimelineHeader>{value.company}</TimelineHeader>
                            <TimelineSubheader>{value.roles}</TimelineSubheader>
                            <p>{value.description}</p>
                        </TimelineBody>
                    </TimelineItem>)
                  })
                : null}
            </Detail>
            <Detail>
              <DetailHeader>Education</DetailHeader>
              {devResume.education
                ? devResume.education.map((value, index) => {
                    return (
                    <TimelineItem key={index}>
                        <TimelinePeriod>{value.period}</TimelinePeriod>
                        <TimelineBody>
                            <TimelineHeader>{value.school}</TimelineHeader>
                            <TimelineSubheader>{value.degree}</TimelineSubheader>
                            <p>{value.description}</p>
                        </TimelineBody>
                    </TimelineItem>)
                  })
                : null}
            </Detail>
            <Detail>
              <DetailHeader>Life Goals</DetailHeader>
              <DetailList>
                {devResume.goals
                  ? devResume.goals.map((value, index) => {
                      return <li key={index}>{value}</li>
                    })
                  : null}
              </DetailList>
            </Detail>
          </DetailSection>
        </Content>
      </Page>
    </>
  )
}

const AnchorLink = styled.a`
  color: inherit;
  text-decoration: none;
  box-shadow: none;
  cursor: pointer;

  &:hover {
    color: rgb(164, 142, 216);
  }
`

const Page = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgb(192, 191, 185);

  @media print {
    background-color: white;
  }
`

const Content = styled.div`
  display: flex;
  background-color: white;
  font-family: "Lato", sans-serif;
  width: 60%;
  min-width: 900px;
  box-shadow: 1px 5px 5px;

  @media screen and (max-width: 899px) {
    flex-direction: column;
    min-width: 320px;
    width: 100%;
  }

  @media print {
    flex-direction: column;
    width: 100%;
    min-width: 0px;
    box-shadow: none;
  }
`

const Striker = styled.aside`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  background-color: rgb(72, 34, 158);
  font-family: "Lato", sans-serif;
  color: white;

  @media screen and (max-width: 899px) {
    padding-top: 20px;
  }

  @media print {
    min-width: 250px;
    padding-top: 10px;
    background-color: inherit;
    color: inherit;
  }
`

const Portrait = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  & img {
    border-radius: 50%;
    width: 150px;
  }
`

const Title = styled.h1`
  font-size: 1.6rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  text-transform: none;
  margin: 0;
`

const Subtitle = styled.h2`
  font-size: 1.4rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  text-transform: none;
  margin: 0;
`

const StrikerHeader = styled.h3`
  font-size: 1.2rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  margin: 0;
  background-color: rgb(51, 25, 112);
  padding: 5px 10px;
  text-transform: none;

  @media print {
    color: white;
  }
`

const StrikerSection = styled.div`
  display: flex;
  flex-direction: column;
`

const StrikerItem = styled.div`
  padding: 10px;

  @media print {
    padding: .1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const StrikerItemLabel = styled.h4`
    margin: 0;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 1rem;
    text-transform: none;
    font-kerning: none;
    kerning: none;
    letter-spacing: 0em;
`

const StrikerItemContent = styled.p`
    margin: 0;
`

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 899px) {
    padding-top: 20px;
  }

  @media print {
    padding-top: 20px;
  }
`

const Detail = styled.div`
  padding: 10px;
  
  @media print {
    padding: 2em;
  }
`

const DetailContent = styled.p`
  padding-top: 10px;
  margin: 0;
`

const DetailHeader = styled.h2`
  font-size: 1.4rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  text-transform: none;
  margin: 0;
`

const DetailList = styled.ul`
    font-size: 1.4rem;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    margin: 0;
    margin-left: 30px;

    & > li {
        margin: 0;
        font-family: "Lato", sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`

const TimelineItem = DetailContent.withComponent("div")

const TimelinePeriod = styled.div`
  color: gray;
`

const TimelineBody = styled.div`
  & p {
    padding-top: 5px;
    margin: 0;
  }
`

const TimelineHeader = styled.div`
  font-size: 1.1rem;
`

const TimelineSubheader = styled.div`
  font-size: 0.9rem;
`