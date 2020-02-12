import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import WinnerChart from '../components/winner'
import WinningDifference from '../components/winningDifference'
import play from 'play-war'

const Home = () => {
  const [shouldPlay, setShouldPlay] = useState(false)
  const [playerOneWins, setPlayerOneWins] = useState(0)
  const [playerTwoWins, setPlayerTwoWins] = useState(0)
  const [ties, setTies] = useState(0)
  const [differences, setDifferences] = useState([])
  const [totalRoundsPlayed, setTotalRoundsPlayed] = useState(0)
  const [averageTurns, setAverageTurns] = useState(0)

  useEffect(() => {
    if (!shouldPlay) return
    const interval = setInterval(() => {
      const rounds = 1
      const {
        averageTurns: averageTurnsForRounds,
        results
      } = play(rounds)

      const [playerOneWin, playerTwoWin, tie, diffs] = results.reduce((acc, res) => {
        const [playerOneWin, playerTwoWin, tie, diffs] = acc
        const { winner, winningDifferences } = res
        const nextPlayerOneWin = (winner === 0 ? 1 : 0) + playerOneWin
        const nextPlayerTwoWin = (winner === 1 ? 1 : 0) + playerTwoWin
        const nextTie = (winner === 2 ? 1 : 0) + tie
        const nextDiffs = diffs.reduce((arr, diff, idx) => {
          arr[idx] = (winningDifferences[idx] || 0) + diff
          return arr
        }, [])
        return [nextPlayerOneWin, nextPlayerTwoWin, nextTie, nextDiffs]
      }, [0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])

      console.log({
        diffs,
        differences: differences.map(diff => diff.y)
      })

      const nextDifferences = diffs.map((val, idx) => ({
        x: idx, y: val + ((differences[idx] || {}).y || 0)
      }))

      setAverageTurns(
        (averageTurns * totalRoundsPlayed + averageTurnsForRounds) / (totalRoundsPlayed + rounds)
      )
      setTotalRoundsPlayed(totalRoundsPlayed + rounds)
      setTies(ties + tie)
      setPlayerOneWins(playerOneWins + playerOneWin)
      setPlayerTwoWins(playerTwoWins + playerTwoWin)
      setDifferences(nextDifferences)
    }, 20)

    return () => clearInterval(interval)
  }, [
    shouldPlay,
    playerOneWins,
    playerTwoWins,
    ties,
    differences,
    totalRoundsPlayed,
    averageTurns
  ])

  function togglePlaying () {
    setShouldPlay(!shouldPlay)
  }

  console.log({ differences })

  return (
    <div>
      <Head>
        <title>War Data</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='./styles.css' />
      </Head>
      <div className='wrapper'>
        <div className='main'>
          <div />
          <div className='controls'>
            <h1>War</h1>
            <p className='description'>Data visualizations of the boring card game called War.</p>
            <button onClick={togglePlaying}>{shouldPlay ? 'Stop' : 'Start'} Playing</button>
          </div>
          <div />
          <div className='data-container'>
            <div className='data-container-header'>
              <h3>Winners</h3>
              <p className='description'>The player to win the complete game</p>
            </div>
            <WinnerChart playerOneWins={playerOneWins} playerTwoWins={playerTwoWins} ties={ties} />
          </div>
          <div className='data-container'>
            <div className='data-container-header'>
              <h3>Winning Differences</h3>
              <p className='description'>The difference between the winning card and the losing card in a single turn</p>
            </div>
            <WinningDifference differences={differences} />
          </div>
          <div className='data-container'>
            <div className='data-container-header'>
              <h3>Average Number of Turns</h3>
              <p className='description'>The average number of turns taken in a complete game</p>
            </div>
            <p className='number-of-turns'>{Math.floor(averageTurns)}</p>
          </div>
        </div>
      </div>
      <footer className='footer'>
        <a rel='noopener noreferrer' target='_blank' href='https://github.com/stripedpajamas/war-now'>Made with Next.js & Victory</a>
      </footer>
    </div>

  )
}

export default Home
