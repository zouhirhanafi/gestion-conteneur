import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Translate, ValidatedField } from 'react-jhipster';
import _ from 'lodash';

import {
  Row,
  Col,
  Label,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  FormGroup,
  Input as RSInput,
  Collapse,
  NavbarToggler,
} from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paramSelector, paramsSelector } from 'app/entities/parameter/params.reducer';
import { connect } from 'react-redux';

export const RowForm = props => <Row form {...props} />;

export interface ILabeledValueProps {
  labelKey: string;
  label?: string;
  children?: any;
}

export const LabeledValue = ({ labelKey, label = labelKey, children }: ILabeledValueProps) => {
  // const value = !isObject(children) ? <span className="value">{children}</span> : children;
  return (
    <Col>
      <Row>
        <Col md={4}>
          <Label>
            <Translate contentKey={labelKey}>{label}</Translate>
          </Label>
        </Col>
        <Col md={8} className="value">
          {children}
        </Col>
      </Row>
    </Col>
  );
};

export const LabeledParamValue = ({ children, ...props }: ILabeledValueProps) => (
  <LabeledValue {...props}>
    <ParamValue value={children} />
  </LabeledValue>
);

export const CardHeaderLink = ({ labelKey = undefined, icon = undefined, link }) => (
  <NavItem>
    <NavLink tag={Link} to={link} className="btn-link">
      {icon && <FontAwesomeIcon icon={icon} />}
      {labelKey && (
        <span>
          <Translate contentKey={labelKey} />
        </span>
      )}
    </NavLink>
  </NavItem>
);
export const HistoriqueLink = ({ link }) => <CardHeaderLink labelKey="entity.actio.history" icon="history" link={link} />;

export const CardNavbar = ({ titleKey = undefined, title = titleKey, collapsible = false, toggle, isOpen, links = undefined }) => (
  <>
    {titleKey ? <Translate contentKey={titleKey}>{title}</Translate> : title}
    <div className="ml-auto float-right">
      {collapsible && (
        <NavbarToggler className="float-right card-link toggler" onClick={toggle}>
          <FontAwesomeIcon icon={isOpen ? 'chevron-down' : 'chevron-right'} />
        </NavbarToggler>
      )}
      {links}
    </div>
  </>
);

export interface ICardDetailProps {
  titleKey?: string;
  title?: any;
  editLink?: string;
  links?: any;
  children: any;
  cardClassName?: string;
  cardHeaderClassName?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export const CardDetail = ({
  titleKey,
  title,
  editLink,
  children,
  links,
  collapsible = false,
  defaultOpen = true,
  cardClassName = '',
  cardHeaderClassName = 'table-light',
}: ICardDetailProps) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const toggle = () => setOpen(!isOpen);
  let content = <CardBody>{children}</CardBody>;
  if (collapsible) {
    content = <Collapse isOpen={isOpen}>{content}</Collapse>;
  }
  return (
    <Card className={cardClassName}>
      <CardHeader className={cardHeaderClassName}>
        {/* <Translate contentKey="chuApp.diagnostic.detail.title">Diagnostic</Translate> */}
        {/* <Button tag={Link} to={`/diagnostic/${diagnosticEntity.id}/edit`} replace color="primary" className="ml-auto">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button> */}
        <CardNavbar titleKey={titleKey} title={title} collapsible={collapsible} isOpen={isOpen} toggle={toggle} links={links} />
      </CardHeader>
      {content}
    </Card>
  );
};

export const Input = ({ name, id = name, ...props }) => (
  <ValidatedField type="text" className="form-control" {...props} name={name} id={id} />
);

export const LabeledInput = ({
  groupClassName = undefined,
  labelKey = undefined,
  label = labelKey,
  name,
  id = name,
  groupProps = {},
  ...props
}) => (
  <FormGroup className={groupClassName} {...groupProps}>
    <Label for={id}>{labelKey ? <Translate contentKey={labelKey}>{label}</Translate> : label}</Label>
    <Input {...props} name={name} id={id} />
  </FormGroup>
  // </FormGroup>
);

export const Select = ({
  options = [],
  labelKey = undefined,
  name,
  id = name,
  allowEmpty = true,
  emptyText = '',
  inline = false,
  renderOption = undefined,
  ...props
}) => {
  const input = (
    <Input
      type="select"
      name={name}
      id={id}
      className={classNames({
        'col-8 col-md-9': inline,
      })}
      {...props}
    >
      {allowEmpty ? <option value="">{emptyText}</option> : null}
      {options.map(option => {
        if (renderOption) return renderOption(option);
        let value = option;
        let label = option;
        if (!(_.isString(option) || _.isNumber(option))) {
          value = option.value;
          label = option.label || value;
        }
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </Input>
  );
  if (labelKey) {
    return (
      <FormGroup row={inline}>
        <Label
          for={id}
          className={classNames({
            'col-4 col-md-3': inline,
          })}
        >
          <Translate contentKey={labelKey} />
        </Label>
        {input}
      </FormGroup>
    );
  } else {
    return input;
  }
};

export const ParamOptions = ({ options = [], allowEmpty = true, emptyText = '' }) => {
  const result = (
    <>
      {allowEmpty ? <option value="">{emptyText}</option> : null}
      {options.map(option => {
        return <ParamOption value={option} key={option} />;
      })}
    </>
  );
  return result;
};

export const ParamsSelect = props => <Select renderOption={option => <ParamOption value={option} key={option} />} {...props} />;
const paramsSelectMapStateToProps = (state: any, { paramName }) => ({
  options: paramsSelector(paramName)(state),
});
export const ParamsSelectContainer = connect(paramsSelectMapStateToProps)(ParamsSelect);
export const ParamOptionsContainer = connect(paramsSelectMapStateToProps)(ParamOptions);

export const Option = ({ value, label = value }) => <option value={value}>{label}</option>;
const paramOptionMapStateToProps = (state: any, { value }) => ({
  label: (paramSelector(value)(state) || {})['label'],
});
export const ParamOption = connect(paramOptionMapStateToProps)(Option);

export const Span = ({ value, label = value, dispatch = undefined, ...props }) => <span {...props}>{label}</span>;
export const ParamValue = connect(paramOptionMapStateToProps)(Span);
export const ParamsValues = ({ values }) => (
  <>
    {values.map(value => (
      <ParamValue value={value} key={value} className="badge badge-info m-1" />
    ))}
  </>
);
