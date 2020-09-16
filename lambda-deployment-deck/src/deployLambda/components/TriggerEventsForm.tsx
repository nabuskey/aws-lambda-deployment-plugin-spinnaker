// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, {useState} from 'react';

import { Option } from 'react-select';

import {
  FormikFormField,
  HelpField,
  IFormikStageConfigInjectedProps,
  IFormInputProps,
  MapEditorInput,
  NumberInput,
  TetheredCreatable,
} from '@spinnaker/core';


export function TriggerEventsForm( props: IFormikStageConfigInjectedProps ) { 
  const { values, errors } = props.formik;

  const onChange = (o: Option, field: any) => {
    props.formik.setFieldValue(field, o.map((arn: any) => arn.value));
  }  

  return( 
    <div>
      <FormikFormField
        name="triggerArns"
        label="Event ARNs"
        help={<HelpField content="The resource ARNs for Lambda event trigger sources. Input the entire ARN and select `Create option TRIGGER-ARN-INPUT` to add the ARN." />}
        input={(inputProps: IFormInputProps) => (
          <TetheredCreatable
            {...inputProps}
            multi={true} 
            placeholder={ 
              "Input ARN..."
            }
            onChange={(e: Option) => {
                onChange(e, 'triggerArns');
            }} 
            value={values.triggerArns ?
              values.triggerArns
                .map((arn: string) => ({value: arn, label:arn})) :
              []
            } 
          />
        )}
        required={false}
      />
      
      <FormikFormField
        name="batchSize"
        label="Event Batch Size"
        help={<HelpField content="" />}
        input={(inputProps: IFormInputProps) => (
          < NumberInput
            {...inputProps} 
          />
        )}
        required={false}
      /> 
    </div>
  );
} 