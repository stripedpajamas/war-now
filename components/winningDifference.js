import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryBar
} from 'victory'

const WinningDifference = (props) => {
  const { differences } = props

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={40}>
      <VictoryAxis domain={{ x: [1, 12] }} />
      <VictoryAxis dependentAxis />
      <VictoryBar data={differences} />
    </VictoryChart>
  )
}

export default WinningDifference
