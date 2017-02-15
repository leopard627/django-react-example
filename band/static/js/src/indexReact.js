//if the data is gonna change use *state
//if the data is not goona change like image , title  use *props
//
//var bands = 
//	[
//		{ name : "Bayside", image : "https://zealnyc.com/wp-content/uploads/2015/02/bayside-main-promo-photo-cult.jpg" },
//		{ name : "Paramore", image : "http://www.rockbandaide.com/wp-content/uploads/2013/11/Paramore%2BTheNew.jpg" },
//		{ name : "Bring Me The Horizon", image : "https://i1.wp.com/www.metalinjection.net/wp-content/uploads/2016/07/bring-me-the-horizon-brian-baker.jpg?w=630" }
//	]


var bands = [];

//
var BandComponent = React.createClass({

	getInitialState: function() {
		return {customText: "Text before the click"};
	},

	componentDidMount: function() {
		$.ajax({

			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				xhr.addEventListener("progress", function(evt){
					if (evt.lengthComputable) {
						               var percentComplete = evt.loaded / evt.total;
						               // Do something with download progress
						//                console.log(percentComplete);
						//                           
					}
					       
				}, false);
			    return xhr;
			},

			      url: "band/api.json",
			      dataType: 'json',
			      cache: false,

			success: function(data) {
				        this.setState(
							{data:data}
						);
			}.bind(this),
			error: function(xhr, status, err) {
				        console.error(this.props.url, status, err.toString());

			}.bind(this)

		});
		  
	},

	customClickFunction: function () {
		this.setState({customText: "You clicked the button "});
	},

		render : function () {
			var bands = []
			for (var key in this.state.data) {
				bands.push(this.state.data[key])
			}

			var testStyle = {fontSize : '18px', marginRight : '20px' ,fontColor : 'Red'}
			return (
				<div style ={testStyle}>
					<h1>{this.state.customText}</h1>
					<button onClick={this.customClickFunction}>Click Me!! </button>

				{
					bands.map(function(band){
					return (
						<Band name={band.name} image={band.image} />
					)
				})
				}

				</div>
			)
		}
	}
);


var Band = React.createClass({
	render : function () {

		return (
			<div>
				<h2>{this.props.name} </h2>
				<img src={this.props.image} />
			</div>
		)
	}
});

ReactDOM.render(
	<BandComponent bands={bands} />,
	document.getElementById(
		'content'
))
