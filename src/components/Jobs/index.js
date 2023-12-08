import Cookies from 'js-cookie'

import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {profileDetails: {}, jobsList: []}

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedProfileDetails = {
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
        profileImageUrl: data.profile_details.profile_image_url,
      }
      this.setState({profileDetails: updatedProfileDetails})
    }
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobsList: updatedJobs})
    }
  }

  render() {
    const {profileDetails, jobsList} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-with-filters-container">
            <div className="profile-container">
              <img src={profileImageUrl} alt={name} />
              <h1 className="profile-name">{name}</h1>
              <p className="profile-bio">{shortBio}</p>
            </div>
            <hr className="horizontal-line" />
            <div>
              <h1 className="side-heading">Type of Employment</h1>
              <ul>
                {employmentTypesList.map(eachItem => (
                  <li className="employment-list-item">
                    <input
                      type="checkbox"
                      id={`employment-check-box ${eachItem.employmentTypeId}`}
                    />
                    <label
                      key={eachItem.employmentTypeId}
                      htmlFor={`employment-check-box ${eachItem.employmentTypeId}`}
                      className="employment-list-item-description"
                    >
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="horizontal-line" />
            <div>
              <h1 className="side-heading">Salary Range</h1>
              <ul>
                {salaryRangesList.map(eachItem => (
                  <li className="employment-list-item">
                    <input
                      type="radio"
                      id={`salary ${eachItem.salaryRangeId}`}
                      value={eachItem.label}
                      name="salary"
                    />
                    <label
                      key={eachItem.salaryRangeId}
                      htmlFor={`salary ${eachItem.salaryRangeId}`}
                      className="employment-list-item-description"
                    >
                      {eachItem.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="search-bar-container">
              <input
                type="search"
                placeholder="Search"
                className="search-bar"
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
              >
                <BsSearch className="search-icon" size={20} />
              </button>
            </div>
            <ul>
              {jobsList.map(eachItem => (
                <JobItem jobDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
