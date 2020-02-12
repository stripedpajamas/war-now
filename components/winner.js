import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis
} from 'victory'

const Winner = (props) => {
  const { playerOneWins, playerTwoWins, ties } = props
  const data = [
    { x: 'Player One', y: playerOneWins },
    { x: 'Tie', y: ties },
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
        labels={({ datum }) => {
          return datum.x === 'Tie' ? `ties: ${datum.y}` : `wins: ${datum.y}`
        }}
      />
    </VictoryChart>
  )
}

export default Winner
