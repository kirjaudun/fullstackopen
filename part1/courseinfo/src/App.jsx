const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
    {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const ex1 = props.course.parts[0].exercises
  const ex2 = props.course.parts[1].exercises
  const ex3 = props.course.parts[2].exercises
  const name1 = props.course.parts[0].name
  const name2 = props.course.parts[1].name
  const name3 = props.course.parts[2].name

  return (
    <div>
      <Part part={name1} exercises={ex1} />
      <Part part={name2} exercises={ex2} />
      <Part part={name3} exercises={ex3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
