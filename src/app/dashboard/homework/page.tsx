'use client'
import React from 'react';
import { Container, Box, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {useLocation} from "react-router";
import * as querystring from "querystring";

const AssignmentCard = ({ assignment }) => {
  const { name, score, comment, deadline, submit, courseName } = assignment;
  const isDeadlinePassed = new Date() > deadline;
  const cardStyle = {
    padding: "20px",
    position: "relative",
    backgroundColor: isDeadlinePassed ? '#33ff99' : "white"
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        position: "relative", // 保证这里的值是有效的CSS position属性值
        backgroundColor: isDeadlinePassed ? "#00aa00" : "white",
      }}
    >
      <Typography variant="h5" component="h2">
        {name} -- {courseName}
      </Typography>
      <Typography variant="body2">
        Score: {score || "Not Available"}
      </Typography>
      <Typography variant="body2">
        Teacher&apos;s Comment: {comment || "No comment"}
      </Typography>
      <Typography variant="body2">
        Deadline: {deadline.toLocaleString()} 
        {/* {new Date().toLocaleString()} */}
      </Typography>
      <Typography variant="body2">
        Status: {submit?"Already submitted":"Not yet submitted"} 
        {/* {new Date().toLocaleString()} */}
      </Typography>
    </Paper>
  );
};

export default function AssignmentPage() {
    const router = useRouter();
    const assignments = [];
    const queryParams = new URLSearchParams(window.location.search);
    const courseParam = queryParams.get('course'); // 获取 'xx' 参数的值
    const exampleAssignments = assignments.length === 0 ? [
      {
        id: "CS666",
        name: "Assignment 1",
        score: "Not Available",
        comment: "",
        deadline: new Date('2023-11-30T23:59:59'),
        submit: false,
        courseName: "Data Structure and Analysis"
      },
      {
        id: "CS888",
        name: "Assignment 2",
        score: "85/100",
        comment: "Q1 -10  Q3 -5",
        deadline: new Date('2023-11-17T23:59:59'),
        submit: true,
        courseName: "Object Oriented Analysis Design"
      },
      // 添加更多作业信息
    ] : assignments;
    return (
      <Container component="main" maxWidth="xs" sx={{ minWidth:"55%" }} onClick={() => router.push('/dashboard/homework/submit')}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            {/* <Typography variant="h4" component="h1" marginBottom={4}>
          Course: {courseName}
        </Typography> */}
            <Grid container spacing={2} alignItems="center">
                {exampleAssignments
                    .filter(assignment => assignment.id === courseParam || courseParam == null)
                    .map((assignment, index) => (
                        <Grid item xs={12} key={index}>
                            <Box onClick={() => {/* 处理点击事件 */}} sx={{ cursor: "pointer" }}>
                                <AssignmentCard assignment={assignment} />
                            </Box>
                        </Grid>
                    ))}
                {exampleAssignments.filter(assignment => assignment.id === courseParam).length === 0 &&
                    courseParam != null &&
                    (
                    <Grid item xs={12}>
                        <Typography>No Assignment</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
      </Container>
    );
  }
  