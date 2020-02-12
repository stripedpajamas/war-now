import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis
} from 'victory'

const Winner = (props) => {
  const { playerOneWins, playerTwoWins } = props
  const data = [
    { x: 'Player One', y: playerOneWins },
    { x: 'Player Two', y: playerTwoWins }
  ]
  const totalGamesPlayed = playerOneWins + playerTwoWins

  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={40}>
      <VictoryAxis dependentAxis domain={{ y: [0, totalGamesPlayed] }} />
      <VictoryAxis />
      <VictoryBar
        barWidth={40}
        data={data}
        labels={({ datum }) => `wins: ${datum.y}`}
      />
    </VictoryChart>
  )
}

export default Winner
