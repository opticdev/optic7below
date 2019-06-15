import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {withRfcContext} from '../contexts/RfcContext';
import Typography from '@material-ui/core/Typography';
import SchemaEditor from './shape-editor/SchemaEditor';
import {EditorModes, withEditorContext} from '../contexts/EditorContext';
import ContributionTextField from './contributions/ContributionTextField';
import Divider from '@material-ui/core/Divider';
import {updateContribution} from '../engine/routines';

const styles = theme => ({
	root: {
		paddingLeft: 12,
		paddingRight: 12,
		paddingTop: 15
	},
	schemaEditorContainer: {
		marginTop: 5,
		// backgroundColor: '#fafafa'
	}
});

class ConceptsPage extends React.Component {
	render() {
		const {queries, rfcId, classes, conceptId, mode, handleCommand} = this.props;
		const currentShape = queries.conceptsById(conceptId);
		const contributions = queries.contributions()

		console.log(contributions.asJsDictionary)

		return <div className={classes.root}>

			<ContributionTextField value={currentShape.namedConcept.name}
								   variant={'heading'}
								   placeholder={'Concept Name'}
								   mode={mode}
								   onBlur={() => {
								   }}
			/>

			<ContributionTextField value={contributions.getOrUndefined(conceptId, 'description')}
								   variant={'multi'}
								   placeholder={'Description'}
								   mode={mode}
								   onBlur={(value) => {
									   handleCommand(updateContribution(conceptId, 'description', value))
								   }}
			/>

			<Typography variant="h6" color="primary">Shape</Typography>

			<div className={classes.schemaEditorContainer}>
				<SchemaEditor conceptId={conceptId}
							  currentShape={currentShape}
							  mode={mode}
							  handleCommand={handleCommand}
				/>
			</div>

			<Divider style={{marginTop: 15, marginBottom: 15}} />

			<Typography variant="h6" color="primary">Usages</Typography>

		</div>
	}
}

export default withEditorContext(withRfcContext(withStyles(styles)(ConceptsPage)))
