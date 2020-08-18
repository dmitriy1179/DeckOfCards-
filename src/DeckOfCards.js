import React from "react";
import styled from "@emotion/styled";

const Deck = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 220px);
  grid-gap: 50px;
  margin: 20px 0;
`;

const Card = styled.img`
  width: 200;
  height: 200;
  object-fit: contain;
`;

const shuffleCards = async (deckID) => {
  const cardsJson = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`
  );
  const cards = await cardsJson.json();
  return cards.deck_id
}

const fetchDeckOfCards = async (count, deckID = "new") => {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${count}`
  );
  const res = await response.json();
  return res
};

const minValue = 1;
const maxValue = 52;

const DeckOfCards = () => {
  const [cards, setCards] = React.useState([]);
  const [value, setValue] = React.useState(maxValue);
  const handleChange = (event) => setValue(event.target.value);
  const [deckId, setDeckId] = React.useState("new");
  const [disableButton, setDisableButton] = React.useState(false);
  const [status, setStatus] = React.useState("pending")
  const handleClick = async () => {
    setStatus("pending");
    setDisableButton(true);
    try {
      const Id = await shuffleCards(deckId)
      await fetchDeckOfCards(value, Id).then((resp) => setCards(resp.cards));
      setDisableButton(false);
      setStatus("resolved")
    } catch(e) {
      setDisableButton(false);
      setStatus("rejected");
    }
  }

  React.useEffect(() => {
    (async () => {
      setStatus("pending");
      try {
        await fetchDeckOfCards(value).then((resp) => {
          setCards(resp.cards);
          setDeckId(resp.deck_id)
        });
        setStatus("resolved")
      } catch (e) {
        setStatus("rejected");
      }
    })()
  }, [value]);

  if (status === "pending") {
    return (
      <section>
      <h1>Deck of Cards</h1>
      <div>
        <input type="range" id="cardsNumber" name="cardsNumber" style={{verticalAlign: "center"}}
          min={minValue} max={maxValue} defaultValue={maxValue} onChange={handleChange} />
        <label htmlFor="cardsNumber" style={{margin: "10px"}}>{value}</label>
        <button disabled={disableButton} type="button" onClick={handleClick}>Shuffle</button>
        <div>min number of cards {minValue}</div>
        <div>max number of cards {maxValue}</div>
      </div>
      <div>Loading...</div>
    </section>
    ) 
  }

  if (status === "rejected") {
    return (
      <section>
      <h1>Deck of Cards</h1>
      <div>
        <input type="range" id="cardsNumber" name="cardsNumber" style={{verticalAlign: "center"}}
          min={minValue} max={maxValue} defaultValue={maxValue} onChange={handleChange} />
        <label htmlFor="cardsNumber" style={{margin: "10px"}}>{value}</label>
        <button disabled={disableButton} type="button" onClick={handleClick}>Shuffle</button>
        <div>min number of cards {minValue}</div>
        <div>max number of cards {maxValue}</div>
      </div>
      <div>An error occured.</div>
    </section>
    ) 
  }

  return (
    <section>
      <h1>Deck of Cards</h1>
      <div>
        <input type="range" id="cardsNumber" name="cardsNumber" style={{verticalAlign: "center"}}
          min={minValue} max={maxValue} defaultValue={maxValue} onChange={handleChange} />
        <label htmlFor="cardsNumber" style={{margin: "10px"}}>{value}</label>
        <button disabled={disableButton} type="button" onClick={handleClick}>Shuffle</button>
        <div>min number of cards {minValue}</div>
        <div>max number of cards {maxValue}</div>
      </div>
      <Deck>
        {cards.map((card) => (
          <Card key={card.code} src={card.image} alt={card.code} />
        ))}
      </Deck>
    </section>
  );
};

export default DeckOfCards;