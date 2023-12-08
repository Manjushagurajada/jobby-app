import Cookies from 'js-cookie'

import {Component} from 'react'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'

import SkillCard from '../SkillCard'

import './index.css'

class JobItemDetails extends Component {
  state = {jobItemDetails: {}}

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      this.setState({jobItemDetails: updatedData})
    }
  }

  render() {
    const {jobItemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobItemDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          <div className="job-list-item">
            <div className="logo-with-role">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div>
                <h1 className="job-role">{title}</h1>
                <div className="rating-container">
                  <FaStar size={12} color="#fbbf24" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-with-package">
              <div className="icons-container">
                <div className="logo-container">
                  <MdLocationOn className="icon" />
                  <p className="job-description">{location}</p>
                </div>
                <div className="logo-container">
                  <BsFillBriefcaseFill className="icon" />
                  <p className="job-description">{employmentType}</p>
                </div>
              </div>
              <h1 className="package">{packagePerAnnum}</h1>
            </div>
            <hr className="line" />
            <div className="individual-container">
              <h1 className="job-description-heading">Description</h1>
              <p className="job-description">{jobDescription}</p>
            </div>
            <div className="individual-container">
              <h1 className="side-headings">Skills</h1>
              <ul>
                {skills.map(eachSkill => (
                  <SkillCard skillDetails={eachSkill} key={eachSkill.id} />
                ))}
              </ul>
            </div>
            <div className="individual-container">
              <h1 className="side-headings">Life at Company</h1>
              <div>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
