<template>
  <div class="app-content transmission-security-details">
    <el-row type="flex"  class="inner">
      <el-col :span="24" class="inner-left">
        <!-- 标题 -->
        <div class="header">
          <p class="title">佛山供电局线路第一种票</p>
          <p class="number">
            编号：
            <span>{{tableMsg.ph}}</span>
          </p>
        </div>

        <table
          cellspacing="0"
          bocellpadding="0"
          border="1"
          width="100%"
          bordercolor="#bbb"
          class="table-left"
        >
          <colgroup>
            <col width="12%" />
            <col width="38%" />
            <col width="20%" />
            <col width="30%" />
          </colgroup>

          <!-- 计划工作时间 -->
          <tr>
            <td colspan="1" class="label"> 计划工作时间 </td>
            <td colspan="3">
              <el-form label-position="right" label-width="230px" :model="tableIpt">
                <el-form-item label="工作负责人（监护人）：">
                  <el-input v-model="tableIpt.gzfzr"></el-input>
                </el-form-item>
                <el-form-item label="单位和班组：">
                  <el-input v-model="tableIpt.dwhbz"></el-input>
                </el-form-item>
                <el-form-item label="工作负责人及工作班人数总人数：">
                  <el-input v-model="tableIpt.gzfzrjgzbrszs"></el-input>
                </el-form-item>
              </el-form>
            </td>
          </tr>
          <tr>
            <td colspan="1" class="label"> 计划工作时间 </td>
            <td colspan="3">
              <el-row type="flex">
                <span style="paddingRight:8px;">自</span>
                <el-date-picker
                  v-model="tableMsg.jhkssj"
                  type="datetime"
                  placeholder="日期时间"
                  format="yyyy-MM-dd HH:mm"
                ></el-date-picker>
              </el-row>
              <el-row type="flex" style="marginTop:8px;">
                <span style="paddingRight:8px;">至</span>
                <el-date-picker
                  v-model="tableMsg.jhjssj"
                  type="datetime"
                  placeholder="日期时间"
                  format="yyyy-MM-dd HH:mm"
                ></el-date-picker>
              </el-row>
            </td>
          </tr>

          <!-- 是否办理分组工作： -->
          <tr>
            <td colspan="4">
              是否办理分组工作：
              <el-checkbox v-model="tableInfo.isGroupWork">否</el-checkbox>
            </td>
          </tr>

          <!-- 工作班人员 -->
          <tr>
            <td colspan="4">
              <p>工作班人员（不包含工作负责人）：</p>
              <el-input v-model="tableIpt.gzbry" placeholder></el-input>
            </td>
          </tr>

          <!-- 工作任务： -->
          <tr>
            <td colspan="4">
              <p>工作任务：</p>
              <el-input
                v-model="tableMsg.gzrw"
                placeholder
                resize="none"
                :autosize="{ minRows: 1}"
                type="textarea"
              ></el-input>
            </td>
          </tr>

          <!-- 停电线路名称： -->
          <tr>
            <td colspan="4">
              <p>停电线路名称：</p>
              <el-input v-model="tableMsg.tdxlmc" placeholder></el-input>
            </td>
          </tr>

          <!-- 工作地段： -->
          <tr>
            <td colspan="4">
              <p>工作地段：</p>
              <el-input v-model="tableMsg.gzdd" placeholder></el-input>
            </td>
          </tr>

          <!-- 工作要求的安全措施 -->
          <tr>
            <td rowspan="4" colspan="1" class="label">工作要求的安全措施（必要时可附页绘图说明）</td>
            <td colspan="3" width="90%">
              <p>应拉断路器（开关）和隔离开关（刀闸）（注明厂站名及双重名称）：</p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder
                v-model="tableMsg.ylkg"
                resize="none"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>应合的接地刀闸（注明双重编号）或应装的接地线（装设地点）：</p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder
                v-model="tableMsg.yhjdkg"
                resize="none"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>应设遮拦、应挂标识牌（注明位置）：</p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder
                v-model="tableMsg.zzz"
                resize="none"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p>其他安全措施和注意事项：</p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder
                v-model="tableMsg.zzz"
                resize="none"
              ></el-input>
            </td>
          </tr>

          <!-- 应装设的接地线 -->
          <tr>
            <td colspan="1" class="label">应装设的接地线</td>
            <td colspan="3"></td>
          </tr>

          <!-- 签发 -->
          <tr>
            <td colspan="1" class="label">签发</td>
            <td colspan="3">
              <el-form :model="tableInfo.signIssue" label-position="left" inline>
                <el-row>
                  <el-form-item label="工作票签发人签名：" prop="name">
                    <div></div>
                  </el-form-item>
                  <el-form-item label="时间：" prop="name">
                    <div></div>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="工作票会签人签名：" prop="name">
                    <div></div>
                  </el-form-item>
                  <el-form-item label="时间：" prop="name">
                    <div></div>
                  </el-form-item>
                </el-row>
              </el-form>
            </td>
          </tr>

          <!-- 接收 -->
          <tr>
            <td class="label">接收</td>
            <td colspan="3">
              <el-form :model="tableInfo.signIssue" label-position="left" inline>
                <el-form-item label="值班负责人签名：" prop="name">
                  <div></div>
                </el-form-item>
                <el-form-item label="时间：" prop="name">
                  <div></div>
                </el-form-item>
              </el-form>
            </td>
          </tr>

          <!-- 工作许可 -->
          <tr>
            <td rowspan="3" class="label">工作许可</td>
            <td colspan="3">
              <div class="scroll-box">
                <el-checkbox v-model="tableInfo.isGroupWork">工作许可人负责的本工作票“工作要求的安全措施”栏所述措施已经落实</el-checkbox>
                <p>保留或邻近得带电线路、设备：</p>
                <p style="height:28px;"></p>
                <!-- <p>以变电管理所核实得“工作要求的安全措施”栏为准</p> -->
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="scroll-box">
                <p>其他安全事项：</p>
                <p style="height:28px;"></p>
                <!-- <p>无。</p> -->
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <div class="scroll-box">
                <el-form :model="tableInfo.signIssue" label-position="left" inline>
                  <el-row>
                    <el-form-item label="工作许可人签名：" prop="name">
                      <div></div>
                    </el-form-item>
                    <el-form-item label="工作负责人签名：" prop="name">
                      <div></div>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="许可方式：" prop="name">
                      <div></div>
                    </el-form-item>
                    <el-form-item label="时间：" prop="name">
                      <div></div>
                    </el-form-item>
                  </el-row>
                </el-form>
              </div>
            </td>
          </tr>

          <!-- 指定 -->
          <tr>
            <td colspan="4">
              <span>指定</span>
              <span>为专责监护人</span>
              <span>专责监护人签名：</span>
            </td>
          </tr>

          <!-- 安全交代 -->
          <tr>
            <td class="label">安全交代</td>
            <td colspan="3">
              <p>工作班人员确认工作负责人所交代布置的工作任务、安全措施和作业安全注意事项。</p>
              <p class="save-person-fill">
                <span>
                  工作班人员（分组负责人）签名：
                  <u>___________________</u>
                </span>
                <span>
                  时间:
                  <u>______</u>年
                  <u>___</u>月
                  <u>___</u>日
                  <u>___</u>时
                  <u>___</u>分
                </span>
              </p>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="24"  class="inner-right">
        <table
          cellspacing="0"
          bocellpadding="0"
          border="1"
          width="100%"
          bordercolor="#bbb"
          class="table-right"
        >
          <colgroup>
            <col width="12%" />
            <col width="15%" />
            <col width="73%" />
          </colgroup>

          <!-- 工作间断 -->
          <tr>
            <td>工作间断</td>
            <td colspan="2">
              <el-table :data="tableData">
                <el-table-column prop="date" label="序号"></el-table-column>
                <el-table-column prop="name" label="间断时间"></el-table-column>
                <el-table-column prop="address" label="间断许可人"></el-table-column>
                <el-table-column prop="address" label="间断负责人"></el-table-column>
                <el-table-column prop="address" label="方式"></el-table-column>
                <el-table-column prop="address" label="开始时间"></el-table-column>
                <el-table-column prop="address" label="开始负责人"></el-table-column>
                <el-table-column prop="address" label="开始许可人"></el-table-column>
                <el-table-column prop="address" label="方式"></el-table-column>
              </el-table>
            </td>
          </tr>

          <!-- 工作变更 -->
          <tr>
            <td rowspan="3">工作变更</td>
            <td>工作任务</td>
            <td>
              <p>不需要变更安全措施下增加的工作内容：</p>
              <div class="work-change-form">
                <el-row>
                  <p>
                    工作负责人签名：
                    <u>___________</u>
                  </p>
                  <div class="work-change-form-right">
                    <p>
                      工作许可人签名：
                      <u>______________</u>
                    </p>
                    <p>
                      时间：
                      <u>______________</u>
                    </p>
                  </div>
                </el-row>
              </div>
            </td>
          </tr>
          <tr>
            <td>工作负责人</td>
            <td>
              <el-row >
                <div>
                  <p>
                    工作票签发人签名：
                    <u>____________</u>
                  </p>
                  <p>
                    原工作负责人签名：
                    <u>____________</u>
                  </p>
                  <p style="textAlign:right;">
                    工作许可人签名：
                    <u>____________</u>
                  </p>
                </div>
                <div>
                  <div style="height:28px;"></div>
                  <p>
                    现工作负责人签名：
                    <u>______________</u>
                  </p>
                  <p style="textAlign:right;">
                    时间：
                    <u>______________</u>
                  </p>
                </div>
              </el-row>
            </td>
          </tr>
          <tr>
            <td>工作班人员</td>
            <td>
              <table
                cellspacing="0"
                bocellpadding="0"
                border="1"
                width="100%"
                bordercolor="#bbb"
                class="work-person-table"
              >
                <colgroup>
                  <col width="18%" />
                  <col width="32%" />
                  <col width="18%" />
                  <col width="32%" />
                </colgroup>
                <tr>
                  <td>变更情况</td>
                  <td>工作许可人/签发人</td>
                  <td>工作负责人</td>
                  <td>变更时间</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <p>
                      <u>___</u>月
                      <u>___</u>日
                      <u>___</u>时
                      <u>___</u>分
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <p>
                      <u>___</u>月
                      <u>___</u>日
                      <u>___</u>时
                      <u>___</u>分
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <p>
                      <u>___</u>月
                      <u>___</u>日
                      <u>___</u>时
                      <u>___</u>分
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 工作延期 -->
          <tr>
            <td>工作延期</td>
            <td colspan="2">
              <el-row>
                <div>
                  <p style="textAlign:right;">
                    有效期延期到：
                    <u>____________</u>
                  </p>
                  <p>
                    工作许可人签名：
                    <u>____________</u>
                  </p>
                  <p style="textAlign:right;">
                    申请方式：
                    <u>____________</u>
                  </p>
                </div>
                <div>
                  <div style="height:28px;"></div>
                  <p>
                    工作负责人签名：
                    <u>______________</u>
                  </p>
                  <p style="textAlign:right;">
                    时间：
                    <u>______________</u>
                  </p>
                </div>
              </el-row>
            </td>
          </tr>

          <!-- 操作票的终结 -->
          <tr>
            <td rowspan="2">操作票的终结</td>
            <td>作业终结</td>
            <td>
              <p>
                全部作业于
                <u>______________________</u> 结束，线路（或配电设备）上所装设的接地线共（
                <u>__________</u> ）组和使用的个人保安线已全部拆除，工作人员已全部撤离，材料工具已清理完毕，已恢复作业开始前状态。
              </p>
              <el-row>
                <div>
                  <p>
                    工作负责人签名：
                    <u>_____________</u>
                  </p>
                  <p style="textAlign:right;">
                    总结方式：
                    <u>_____________</u>
                  </p>
                </div>
                <div>
                  <p>
                    工作许可人签名：
                    <u>___________________</u>
                  </p>
                  <p style="textAlign:right;">
                    时间：
                    <u>___________________</u>
                  </p>
                </div>
              </el-row>
            </td>
          </tr>
          <tr>
            <td colspan="2"></td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let tableInfo = {
  workTimeData: {
    name: "测试",
  },
  signIssue: {
    name: "测试",
  },
  isGroupWork: false,
};

export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => ({
    tableInfo,
    tableMsg: {},
    tableIpt: {},
    tableData: [],
    drawer: false,
  }),
  created() {
    this.tableMsg = this.data;
  }
};
</script>
<style lang='scss'>
.transmission-security-details {
  p, span, ul, li, h1, td {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }

  .work-time-form {
    .el-form-item {
      margin: 0;
    }
  }

  .table-default {
    line-height: 24px;
    table-layout: fixed;
    border-collapse: collapse;
    td {
      vertical-align: middle;
      padding: 8px;
    }
  }

  //table行高
  .table-row {
    min-height: 60px;
  }

  // 选择框样式
  .el-checkbox {
    white-space: normal;
    .el-checkbox__input {
      line-height: 24px;
    }
  }

  // 合并列
  .table-row-header {
    vertical-align: middle;
    text-align: center;
    font-weight: bold;
    background: #f5f9ff;
  }

  .label {
    font-weight: bold;
    background: #f5f9ff;
  }

  .el-form {
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  .tools {
    padding: 24px;
    background: white;
    margin-top: 24px;
  }

  .inner {
    padding: 24px 0;
  
    .inner-left,
    .inner-right {
      background: white;
    }

    .inner-left {
      .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        .title {
          font-size: 27px;
          line-height: 50px;
        }

        .number {
          padding-left: 50%;
          font-size: 14px;
          color: #999;
          margin-top: 10px;
          margin-bottom: 2px;
        }

        .img {
          position: absolute;
          top: 12px;
          right: 4px;
          height: 36px;
        }
      }

      .table-left {
        @extend .table-default;

        //计划时间
        tr:nth-child(2) {
          height: 100px;
          td:nth-child(2) {
            // background: #f6fcff;
            text-align: center;
            font-weight: bold;
            vertical-align: middle;
          }
        }

        //分组工作选择
        tr:nth-child(3) {
          .el-checkbox {
            .el-checkbox__input {
              line-height: 24px;
            }
          }
        }

        //工作要求的安全措施
        tr:nth-child(8) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
          td:nth-child(2) {
            @extend .table-row;
          }
        }
        tr:nth-child(9) {
          td {
            @extend .table-row;
          }
        }
        tr:nth-child(10) {
          td {
            @extend .table-row;
          }
        }
        tr:nth-child(11) {
          td {
            @extend .table-row;
          }
        }
        // 应装设的接地线
        tr:nth-child(12) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
        }
        // 签发
        tr:nth-child(13) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
          td:nth-child(2) {
            .el-form {
              width: 100%;
              .el-form-item {
                margin: 0;
                padding: 0;
              }

              .el-form-item:nth-child(2) {
                margin-left: 50px;
              }
            }
          }
        }
        // 接收
        tr:nth-child(14) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
          td:nth-child(2) {
            .el-form {
              width: 100%;
              .el-form-item {
                margin: 0;
                padding: 0;
              }

              .el-form-item:nth-child(2) {
                margin-left: 50px;
              }
            }
          }
        }
        // 工作许可
        .scroll-box {
          width: 100%;
          height: 100%;
          overflow: auto;
          font-size: 14px;
        }
        // tr:nth-child(15) {
        //   td:nth-child(1) {
        //     @extend .table-row-header;
        //   }
        //   td:nth-child(2) {
        //     @extend .table-row;
        //     .scroll-box {
        //       width: 100%;
        //       height: 100%;
        //       overflow: auto;
        //       font-size: 14px;
        //     }
        //   }
        // }
        // tr:nth-child(16) {
        //   td:nth-child(1) {
        //     @extend .table-row;
        //     .scroll-box {
        //       width: 100%;
        //       height: 100%;
        //       overflow: auto;
              
        //     }
        //   }
        // }
        // tr:nth-child(17) {
        //   td:nth-child(1) {
        //     @extend .table-row;
        //     .scroll-box {
        //       width: 100%;
        //       height: 100%;
        //       overflow: auto;
        //       .el-form {
        //         width: 100%;
        //         .el-form-item {
        //           margin: 0;
        //           padding: 0;
        //         }

        //         .el-form-item:nth-child(2) {
        //           margin-left: 50px;
        //         }
        //       }
        //     }
        //   }
        // }
        // 指定
        tr:nth-child(18) {
          td:nth-child(1) {
            span:nth-child(1) {
              padding-right: 100px;
            }
            span:nth-child(2) {
              padding-right: 100px;
            }
          }
        }
        // 安全交代
        tr:nth-child(19) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
          td:nth-child(2) {
            .save-person-fill {
              span:nth-child(1) {
                padding-right: 30px;
              }
            }
          }
        }
      }
    }

    .inner-right {
      .table-right {
        @extend .table-default;

        // 工作间断
        tr:nth-child(2) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
          td:nth-child(2) {
            @extend .table-row;
            .el-table__body-wrapper {
              max-height: 200px;
            }
          }
        }

        //工作变更
        tr:nth-child(3) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
          td:nth-child(2) {
            @extend .table-row-header;
          }
          td:nth-child(3) {
            @extend .table-row;
            .work-change-form {
              margin-top: 20px;

              .work-change-form-right {
                p:nth-child(2) {
                  text-align: right;
                }
              }
            }
          }
        }
        tr:nth-child(4) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
          td:nth-child(2) {
            @extend .table-row;
            vertical-align: middle;
          }
        }
        tr:nth-child(5) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
          td:nth-child(2) {
            @extend .table-row;
            padding: 0;
            .work-person-table {
              @extend .table-default;
              tr:nth-child(2) {
                td:nth-child(n + 2) {
                  @extend .table-row-header;
                  
                }
              }
              tr:nth-child(n + 3) {
                td:nth-child(n + 1) {
                  background: #fff;
                  font-size: 14px;
                }
              }
            }
          }
        }

        //工作延期
        tr:nth-child(6) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
        }

        //操作票的终结
        tr:nth-child(7) {
          td:nth-child(1) {
            @extend .table-row-header;
          }
          td:nth-child(2) {
            @extend .table-row-header;
          }
        }
        tr:nth-child(8) {
          td:nth-child(1) {
            height: 150px;

            .scroll-box {
              width: 100%;
              height: 100%;
              overflow: auto;
            }
          }
        }
      }
    }
  }
}
</style>