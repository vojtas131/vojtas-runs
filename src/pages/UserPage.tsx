import { Anchor, Button, Card, CardBody, CardHeader, Page, PageContent } from "grommet";
import React from "react"
import { fetchRuns, resetRuns } from "../api/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getDuration } from "../helpers/timeHelp";


function UserPage() {
    const dispatch = useAppDispatch();
    const runs = useAppSelector(state => state.user.runs);

    const reload = () => {
        dispatch(resetRuns());
        dispatch(fetchRuns());
    }
    
    return (
        <Page>
            <PageContent>
                {runs?.map(x => {
                    return (
                        <Card pad="small">
                            <CardHeader>{x.game} {x.category}</CardHeader>
                            <CardBody pad="medium">
                                <Anchor href={x.link} label={getDuration(x.time)} />
                                {x.comment}
                            </CardBody>
                        </Card>
                    );
                })}
                <Button 
                    margin="small" 
                    hoverIndicator 
                    alignSelf="center" 
                    primary 
                    onClick={() => reload()} 
                    label="Reload"/>
            </PageContent>
        </Page>
    );
}

export default UserPage;