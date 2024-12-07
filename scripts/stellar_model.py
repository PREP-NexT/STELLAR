from manim import *

class STELLARModel(Scene):
    def construct(self):
        # 创建三个主要部分：Actor, Environment, Critic
        actor_box = VGroup(
            Rectangle(height=3, width=4, color=PINK),
            Text("Actor", color=PINK).scale(0.8),
            Text("Policy\nnetwork", color=PINK).scale(0.6),
            Text("PPO", color=PINK).scale(0.5)
        ).arrange(DOWN)
        
        env_box = VGroup(
            Rectangle(height=3, width=4, color=GOLD),
            Text("Environment", color=GOLD).scale(0.8),
            Text("Agricultural & Water\nSystems", color=GOLD).scale(0.6)
        ).arrange(DOWN)
        
        critic_box = VGroup(
            Rectangle(height=3, width=4, color=GREEN),
            Text("Critic", color=GREEN).scale(0.8),
            Text("Value\nnetwork", color=GREEN).scale(0.6)
        ).arrange(DOWN)

        # 布局
        actor_box.to_edge(LEFT)
        env_box.to_edge(RIGHT)
        critic_box.to_edge(UP)

        # 箭头和标签
        state_arrow = Arrow(env_box.get_left(), actor_box.get_right(), color=GOLD)
        action_arrow = Arrow(actor_box.get_right(), env_box.get_left(), color=PINK)
        value_arrow = Arrow(env_box.get_top(), critic_box.get_bottom(), color=GREEN)

        state_label = Text("States", color=GOLD).scale(0.6)
        action_label = Text("Actions", color=PINK).scale(0.6)
        value_label = Text("State value", color=GREEN).scale(0.6)

        state_label.next_to(state_arrow, UP)
        action_label.next_to(action_arrow, DOWN)
        value_label.next_to(value_arrow, RIGHT)

        # 动画
        self.play(Create(actor_box), run_time=1)
        self.play(Create(env_box), run_time=1)
        self.play(Create(critic_box), run_time=1)
        
        self.play(
            Create(state_arrow),
            Write(state_label),
            Create(action_arrow),
            Write(action_label),
            Create(value_arrow),
            Write(value_label),
            run_time=2
        )

        # 添加循环动画效果
        self.play(
            *[
                Rotating(
                    arrow,
                    radians=0.1,
                    about_point=arrow.get_center(),
                    run_time=1,
                    rate_func=there_and_back
                )
                for arrow in [state_arrow, action_arrow, value_arrow]
            ]
        )
        
        self.wait(2)

