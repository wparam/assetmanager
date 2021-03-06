import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Cards/Card.jsx';

import IndexDow from 'widgets/index-dow/dow.widget';
import IndexSap from 'widgets/index-sap/sap.widget';
import IndexTqqq from 'widgets/index-nasdaq/nasdaq.widget';

import TopGainer from 'widgets/top-gainers/topgainers.widget';
import TopLosers from 'widgets/top-losers/toplosers.widget';
import TopMoversInNas from 'widgets/top-movers/topmovers.widget';

import NewsList from 'widgets/news-nasdaq/newsNasdaq.widget';

const Market = props => (
    <div className="content">
        <Grid fluid>
            <Row>
                <Col lg={4} sm={8}>
                    <Card title="DJIA" 
                            category=""  
                            content={
                                <IndexDow />
                            }
                            legend={
                                <div className="legend">
                                    Dow Jones Industrial Average
                                </div>  
                            }>
                    </Card>
                </Col>
                <Col lg={4} sm={8}>
                    <Card title="S&P 500" 
                            category=""  
                            content={
                                <IndexSap />
                            }
                            legend={
                                <div className="legend">
                                    S&P 500 Index
                                </div>  
                            }>
                    </Card>
                </Col>
                <Col lg={4} sm={8}>
                    <Card title="NASDAQ" 
                            category=""  
                            content={
                                <IndexTqqq/>
                            }
                            legend={
                                <div className="legend">
                                    NASDAQ Composite
                                </div>  
                            }>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={4} sm={8}>
                    <Card title="Top Gainer" 
                            category=""  
                            content={
                                <TopGainer showConcrete="true"/>
                            }
                            legend={
                                <div className="legend">
                                    More Gainers
                                </div>  
                            }>
                    </Card>
                </Col>
                <Col lg={4} sm={8}>
                    <Card title="Top Loser" 
                            category=""  
                            content={
                                <TopLosers showConcrete="true"/>
                            }
                            legend={
                                <div className="legend">
                                    More Losers
                                </div>  
                            }>
                    </Card>
                </Col>
                <Col lg={4} sm={8}>
                    <Card title="Top Mover In Nasdaq 100" 
                            category=""  
                            content={
                                <TopMoversInNas showConcrete="true"/>
                            }
                            legend={
                                <div className="legend">
                                    Top Mover In Nasdaq 100
                                </div>  
                            }>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={12} sm={12}>
                    <Card title="Nasdaq100 News" 
                            category=""  
                            content={
                                <NewsList showConcrete="true" market="nasdaq"/>
                            }
                            legend={
                                <div className="legend">
                                </div>  
                            }>
                    </Card>
                </Col>
            </Row>
        </Grid>
    </div>
);

export default Market;