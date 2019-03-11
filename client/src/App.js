import React, { Component } from 'react';
import './style/css/App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tokenEU: null,
			tokenUS: null,
			affixes: []
		}
	}

	componentDidMount() {
		fetch("/api/eu/token/price")
			.then(re => re.json())
			.then(tokenEU => {
				this.setState({
					tokenEU
				});
			});

		fetch("/api/us/token/price")
			.then(re => re.json())
			.then(tokenUS => {
				this.setState({
					tokenUS
				});
			});

		fetch("/api/eu/mythic/affixes")
			.then(re => re.json())
			.then(affixes => {
				this.setState({
					affixes
				});
			});
	};

	renderWoWToken(token) {
		return (
			<div>
				<h1>Region: {token.region}</h1>
				<h2>Price: {(token.price / (100 * 100)).toLocaleString()}g</h2>
				<h3>Last updated: {token.lastUpdated}</h3>
			</div>
		)
	}

	renderAffix(affix) {
		return (
			<div key={affix.id}>
				<img src={affix.imageUrl} alt="" />
				<h3>{affix.name}</h3>
				<h4>{affix.description}</h4>
			</div>
		)
	}

	render() {
		const { tokenEU, tokenUS, affixes } = this.state;

		return (
			<div className="App">
				<div>
					{tokenEU && this.renderWoWToken(tokenEU)}
				</div>
				<div>
					--------------------------------------
        </div>
				<div>
					{tokenUS && this.renderWoWToken(tokenUS)}
				</div>
				<div>
					--------------------------------------
        </div>
				<div>
					{affixes && affixes.map(this.renderAffix)}
				</div>
			</div>
		);
	}
}

export default App;