import {
  VictoryPie
} from 'victory'

const WinningDifference = (props) => {
  const { differences } = props

  return (
    <VictoryPie data={differences} />
  )
}

export default WinningDifference
