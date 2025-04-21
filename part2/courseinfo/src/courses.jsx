const Header = (props) => <h1>Web development curriculum</h1>

const CourseHeader = (props) => <h2>{props.course}</h2>

const Content = (props) => {
  return (
    <div>
    {
      props.parts.map(part => <Part key={part.id} part={part} />)
    }
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

//const Total = (props) => <p>Number of exercises {props.total}</p>
const Total = (props) => {
  const total = props.parts.reduce((total, part) => {
    total += part.exercises
    return total
  }, 0)
  return (<p>Total of {total} exercises</p>)
}

const Course = (props) => {
  return (
    <div>
      <CourseHeader course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const Courses = (props) => {
  return (
    <div>
    <Header />
    {
      props.courseArray.map(course => <Course key={course.id} course={course} />)
    }
    </div>)
}

export default Courses
