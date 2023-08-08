export const gameLogic = () => {
  const playerScore = ref(0)
  const result = ref<string | null>(null)
  const computerOption = ref<string | null>(null)

  const chooseOption = (option: string) => {
    const options = ['rock', 'paper', 'scissors']
    computerOption.value = options[Math.floor(Math.random() * options.length)]

    if (option === computerOption.value) {
      result.value = "It's a tie!"
    } else if (
      (option === 'rock' && computerOption.value === 'scissors') ||
      (option === 'paper' && computerOption.value === 'rock') ||
      (option === 'scissors' && computerOption.value === 'paper')
    ) {
      playerScore.value++
      result.value = 'YOU WIN!'
    } else {
      playerScore.value--
      result.value = 'YOU LOSE!'
    }
  }

  const playAgain = () => {
    result.value = null
    computerOption.value = null
  }

  return {
    playerScore,
    result,
    computerOption,
    chooseOption,
    playAgain
  }
}
