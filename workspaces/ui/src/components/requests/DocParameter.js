
import React from 'react';
import {Typography} from '@material-ui/core';
import {DocDivider, ParametersStyles} from './DocConstants';
import {MarkdownContribution} from './DocContribution';
import {DESCRIPTION} from '../../ContributionKeys';

export function DocParameter({title, description, typeName, children, paramId, updateContribution = () => {}}) {
  return (
    <div style={{maxWidth: 500}}>
      <div style={{paddingTop: 6, paddingBottom: 6, paddingLeft: 4}}>
        <div>
          <Typography variant="subtitle1" component="span" style={ParametersStyles}>{title}</Typography>
          <Typography component="span" style={{marginLeft: 6, fontSize: 12}}>{typeName || 'String'}</Typography>
        </div>
        <MarkdownContribution value={description}
                              label="Description"
                              onChange={(value) => {
                                updateContribution(paramId, DESCRIPTION, value)
                              }}
        />
      </div>
      <DocDivider/>
    </div>
  );
}
