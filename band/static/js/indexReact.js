
var BandComponent = React.createClass(
	{
		render : function () {
			var testStyle = {fontSize : '18px', marginRight : '20px' ,fontColor : 'Red'}
			return (
				<div style ={testStyle}>
				 	is this text is 18px tall??
				 	is this text is 18px tall??
				 	is this text is 18px tall??
				 	is this text is 18px tall??
				</div>
			)
		}
	}
);

ReactDOM.render(
	<BandComponent />,
	document.getElementById(
		'content'
))
