import { Anchor, Card, CardBody, CardHeader } from "grommet";
import React from "react"
import { fetchRuns } from "../api/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getDuration } from "../helpers/timeHelp";


function UserPage() {
    const dispatch = useAppDispatch();
    const runs = useAppSelector(state => state.user.runs);
    dispatch(fetchRuns());

    
    return (
        <>
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
        </>
    );
}

export default UserPage;