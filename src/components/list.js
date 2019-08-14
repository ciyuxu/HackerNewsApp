import React, { Component } from "react";
import Item from "./item";

class List extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  componentWillMount() {
    this.fetchNewestStories();
  }

  fetchNewestStories() {
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then(response => response.json())
      .then(newsItemIds =>
        newsItemIds
          .map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          )
          .slice(0, 25)
      )
      .then(newsItemPromises => Promise.all(newsItemPromises))
      .then(responses => responses.map(response => response.json()))
      .then(promises => Promise.all(promises))
      .then(items => {
        console.log(JSON.stringify(items));
        this.setState(currentState => {
          currentState.list.push(items);
          return { list: currentState.list["0"] };
        });
        console.log(this.state.list);
      });
  }

  render() {
    return (
      <div>
        {this.state.list.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    );
  }
}

export default List;
