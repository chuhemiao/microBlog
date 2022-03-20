import { microblog } from "canisters/microblog"
import React, { useEffect, useState } from "react"
import { message } from "react-message-popup"
import { Auth } from "./Auth"

export function About() {
  const [title, setTitle] = useState("")
  const [lastTags, getValue] = useState("ICP")
  const [contents, setContent] = useState("")

  const postMessage = async () => {
    // isLogin
    const l = localStorage.getItem("isLogin")
    if (l) {
      // if (!title || !contents) {
      //   message.warn("标题和内容不能为空", 2000)
      //   return false
      // }
      // let res = await microblog.post(contents, title, lastTags)
      let res = await microblog.post(contents)
      console.log(res, 7777)
      message.success("发帖成功", 2000)
    } else {
      message.error("未登录", 2000)
    }
  }
  useEffect(() => {
    // refreshPosts()
  }, [])

  return (
    <>
      <div className="overflow-x-hidden bg-gray-100">
        <nav className="px-6 py-4 bg-white shadow">
          <div className="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div>
                <a
                  href="/"
                  className="text-xl font-bold text-gray-800 md:text-2xl"
                >
                  kk德米安
                </a>
              </div>
              <div>
                <button
                  type="button"
                  className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-col hidden md:flex md:flex-row md:-mx-4">
              <a
                href="/"
                className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
              >
                首页
              </a>
              <a
                href="/posts"
                className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
              >
                发帖
              </a>
            </div>
            <div className="w-1/3">
              <Auth />
            </div>
          </div>
        </nav>

        <div className="px-6 py-8">
          <div className="container flex justify-between mx-auto">
            <div className="mx-auto">
              <h2 className="text-2xl font-bold">发布帖子</h2>
              <p className="mt-2 text-lg text-gray-600">
                请填写以下信息后,点击发布.
              </p>
              <div className="mt-8 max-w-md">
                <div className="grid grid-cols-1 gap-6">
                  <label className="block">
                    <span className="text-gray-700">标题</span>
                    <input
                      type="text"
                      className="mt-1 block w-full"
                      placeholder="请输入标题"
                      onChange={(e) => {
                        setTitle(e.target.value)
                      }}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">选择标签?</span>
                    <select
                      className="block w-full mt-1"
                      onChange={(e) => getValue(e.target.value)}
                    >
                      <option>ICP</option>
                      <option>DAO</option>
                      <option>GAME</option>
                      <option>TECH</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-gray-700">添加帖子详情</span>
                    <textarea
                      className="mt-1 block w-full"
                      rows={10}
                      cols={100}
                      onChange={(e) => {
                        setContent(e.target.value)
                      }}
                    ></textarea>
                  </label>
                </div>
              </div>
              <div>
                <button
                  onClick={() => postMessage()}
                  className="mt-2 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                >
                  发布
                </button>
              </div>
            </div>
          </div>
        </div>
        <footer className="px-6 py-2 text-gray-100 bg-gray-800">
          <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
            <a href="#" className="text-2xl font-bold">
              kk德米安
            </a>
            <p className="mt-2 md:mt-0">All rights reserved 2022.</p>
            <div className="flex mt-4 mb-2 -mx-2 md:mt-0 md:mb-0">
              <a
                href="https://twitter.com/demiandao"
                className="mx-2 text-gray-100 hover:text-gray-400"
              >
                <button className="bg-blue-400 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                  <svg
                    className="w-5 h-5 fill-current"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
              </a>
              <a
                href="https://github.com/chuhemiao"
                className=" text-gray-100 hover:text-gray-400"
              >
                <button className="bg-gray-700 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="w-5"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
